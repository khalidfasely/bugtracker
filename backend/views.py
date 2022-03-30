import json
from django.db import IntegrityError

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from django.http import HttpResponse, JsonResponse

from .models import Bugs, Classification, Comments, Project, User

# Create your views here.

def index(request):
    return HttpResponse("Hello, world!")

def user(request):

    #Check if any user logged in
    if request.user.username:
        return JsonResponse({"message": "Login Successfully.", "user": {
            "username": f"{request.user}", "uid": f"{request.user.id}"}
        }, status=201)

    return JsonResponse({"message": "No User!"}, status=201)    

def select_users(request, project_id):
    #get users_with from project with specific project_id
    try:
        project = Project.objects.get(pk=project_id)

    #catch errors
    except:
        return JsonResponse({"message": "Something goes wrong!"}, status=201)

    return JsonResponse({'users': project.serialize()['users_with']}, status=201)

@csrf_exempt
def login_route(request):

    # Check the method request
    if request.method == "POST":
        
        # Try to get the data from front end
        try:
            data = json.loads(request.body)

            username = data.get('username')
            password = data.get('password')
        except:
            return JsonResponse({"message": "No data send with the request."}, status=400)
        
        # Authenticate the user 
        user = authenticate(username=username, password=password)

        # Check if the user exist
        if user is not None:
            login(request, user)

            return JsonResponse({"message": "Login Successfully.", "user": {
                "username": f"{request.user}", "uid": f"{request.user.id}"}
            }, status=201)

        else:
            return JsonResponse({"message": "Invalid username and/or password."}, status=201)
        
    else:
        return JsonResponse({"message": "The method must be POST"}, status=400)

def logout_route(request):
    # Check if user already logged in
    if request.user.username:
        logout(request)

        return JsonResponse({"message": "Logout successfully."}, status=201)
    
    return JsonResponse({"message": "You are not logged in!"}, status=201)

@csrf_exempt
def register(request):
    # Check the method request
    if request.method == 'POST':
        
        # Try to get data from front end
        try:
            data = json.loads(request.body)

            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            confirmation = data.get('confirmation')
        except:
            return JsonResponse({"message": "No data send with the request."}, status=404)

        # Check password's match
        if password != confirmation:
            return JsonResponse({"message": "Passwords must match"}, status=201)

        # Try to create the new account
        try:
            new_user = User.objects.create_user(username, email, password)
            new_user.save()
        except IntegrityError:
            return JsonResponse({"message": "Username already taken."}, status=201)

        # Login new user
        login(request, new_user)

        return JsonResponse({"message": "Register correctly.", "user": {
            "username": f"{request.user}", "uid": f"{request.user.id}"
        }}, status=201)
        

    return JsonResponse({"message": "The method must be POST"}, status=400)

def projects(request):
    # Current user logged in
    current_user = request.user.username

    # Set projects variable
    projects = []

    # Get all projects from db
    all_projects = Project.objects.order_by("-time").all()

    # Loop for all projects in db
    for project in all_projects:

        # Append projects that current user is member on it
        if current_user in project.serialize()["users_with"]:
            projects.append(project)

    return JsonResponse({"projects": [ project.serialize() for project in projects ]}, status=201)

def project(request, pid):
    # default project
    def_project = {
        "user": "default",
        "name": "default",
        "time": "default",
        "admins": [],
        "users_with": [],
        "id": "default"
    }

    # Get current project requested
    project = Project.objects.filter(pk=pid).first()

    # Get bugs on this project
    bugs = Bugs.objects.filter(on_project=project).all()

    # Check if project is in db
    if project is None:
        return JsonResponse({"message": "Project Not Found!"}, status=201)

    # Check if user logged in who's request the data
    if request.user.username not in [user.username for user in project.users_with.all()]:
        return JsonResponse({"project": def_project, "bugs": []}, status=201)

    # Return project data
    return JsonResponse({"project": project.serialize(), "bugs": [bug.serialize() for bug in bugs]}, status=201)

def bug(request, pid, bid):
    # Get the bug
    bug = Bugs.objects.filter(pk=bid).first()

    # Get comments on this bug
    comments = Comments.objects.filter(on_bug=bug).all()

    # Check if bug exist in db
    if bug is None:
        return JsonResponse({"message": "This bug doesn't exist!"}, status=201)

    # Check if the bug on the project
    if bug.on_project.id != pid:
        return JsonResponse({"message": "Wrong request!"}, status=201)

    # Check if user logged in who's request the data
    if request.user.username not in [user.username for user in bug.on_project.users_with.all()]:
        return JsonResponse({"message": "User not allow to see this bug!"}, status=201)

    # Return bug data
    return JsonResponse({"bug": bug.serialize(), "comments": [comment.serialize() for comment in comments]}, status=201)

def get_users(request):
    #get all users
    users = User.objects.all()

    return JsonResponse({"users": [user.username for user in users]}, status=201)

@csrf_exempt
def new_project(request):
    # Check method
    if request.method == 'POST':

        # Check if user logged in
        if not request.user.username:
            return JsonResponse({"message": "No user logged in!"}, status=201)

        # recieve data from frontend
        data = json.loads(request.body)

        project_name = data.get('name')
        users = data.get('users')
        admins = data.get('admins')

        # try to create new project
        try:

            # create new project
            new_project = Project.objects.create(user=request.user, name=project_name)
            
            #add admins
            for admin in admins:
                new_project.admins.add(User.objects.get(username=admin))

            #add users
            for user in users:
                new_project.users_with.add(User.objects.get(username=user))

            #saved the project
            new_project.save()

        #catch errors
        except:
            return JsonResponse({"message": "Something wrong with the data sent!"}, status=201)

        return JsonResponse({"message": "Saved correctly!", "project": new_project.serialize()}, status=201)
    
    # If method not POST
    return JsonResponse({"message": "Method should be POST!"}, status=201)

@csrf_exempt
def edit_project(request, projectId):
    #check request method
    if request.method == 'PUT':

        # Check if user logged in
        if not request.user.username:
            return JsonResponse({"message": "No user logged in!"}, status=201)

        #try find the project in db
        try:
            project = Project.objects.get(pk=projectId)
        
        #catch errors (if no project in db)
        except:
            return JsonResponse({"message": "No Project in database!"}, status=201)

        #Check if user have access to edit this project
        if project.user != request.user:
            return JsonResponse({"message": "User not allow to edit this project!"}, status=201)

        # recieve data from frontend
        data = json.loads(request.body)

        new_name = data.get('name')
        new_users = data.get('users')
        new_admins = data.get('admins')

        #try update project
        try:
            Project.objects.filter(pk=projectId).update(name=new_name)

            admins = Project.objects.get(pk=projectId).admins
            users_with = Project.objects.get(pk=projectId).users_with

            #empty the admins list
            for admin in admins.all():
                admins.remove(admin)

            #empty the users list
            for user in users_with.all():
                users_with.remove(user)

            #add admins
            for admin in new_admins:
                admins.add(User.objects.get(username=admin))

            #add users
            for user in new_users:
                users_with.add(User.objects.get(username=user))
        
        #catch errors
        except:
            return JsonResponse({"message": "Cannot save the updates!"}, status=201)

        return JsonResponse({"project": Project.objects.get(pk=projectId).serialize()}, status=201)

    # If method not PUT
    return JsonResponse({"message": "Method should be PUT!"}, status=201)

@csrf_exempt
def delete_project(request, projectId):
    #try get project from db
    try:
        project = Project.objects.get(pk=projectId)
    
    #catch errors
    except:
        return JsonResponse({"message": "Maybe you try delete a project that doesn't exist!"}, status=201)
    
    # Check if user logged in
    if not request.user.username:
        return JsonResponse({"message": "No user logged in!"}, status=201)

    #Check if user have access to delete this project
    if project.user != request.user:
        return JsonResponse({"message": "User not allow to delete this project!"}, status=201)

    #delete project
    project.delete()

    return JsonResponse({ "message": "Delete Successfully" }, status=201)

@csrf_exempt
def new_bug(request, on_project):
    # check request method
    if request.method == 'POST':

        # Check if user logged in
        if not request.user.username:
            return JsonResponse({"message": "No user logged in!"}, status=201)

        # recieve data from frontend
        data = json.loads(request.body)

        title = data.get('title')
        description = data.get('description')
        is_active = data.get('isActive')
        classification = data.get('classification')
        users = data.get('users')
        admins = data.get('admins')

        #try to create new bug
        try:

            #create new bug
            new_bug = Bugs.objects.create(
                title=title,
                description=description,
                user=request.user,
                on_project=Project.objects.get(pk=on_project),
                active=is_active,
                classification=Classification.objects.get(description=classification)
            )

            #add admins
            for admin in admins:
                new_bug.admins.add(User.objects.get(username=admin))

            #add users
            for user in users:
                new_bug.users_with.add(User.objects.get(username=user))

            #save bug
            new_bug.save()

        #catch errors
        except:
            return JsonResponse({"message": "Something wrong with the data sent!"}, status=201)

        return JsonResponse({"bug": new_bug.serialize()}, status=201)
    
    # If method not POST
    return JsonResponse({"message": "Method should be POST!"}, status=201)

@csrf_exempt
def edit_bug(request, bugId):
    #check request method
    if request.method == 'PUT':

        # Check if user logged in
        if not request.user.username:
            return JsonResponse({"message": "No user logged in!"}, status=201)

        #try find the bug in db
        try:
            bug = Bugs.objects.get(pk=bugId)
        
        #catch errors (if no bug in db)
        except:
            return JsonResponse({"message": "No Bug in database!"}, status=201)

        #Check if user have access to edit this bug
        if bug.user != request.user:
            return JsonResponse({"message": "User not allow to edit this bug!"}, status=201)

        # recieve data from frontend
        data = json.loads(request.body)

        new_title = data.get('title')
        new_description = data.get('description')
        active = data.get('active')
        new_classification = data.get('classification')
        new_users = data.get('users')
        new_admins = data.get('admins')

        #try update bug
        try:
            Bugs.objects.filter(pk=bugId).update(title=new_title, description=new_description, active=active, classification=Classification.objects.get(description=new_classification))

            admins = Bugs.objects.get(pk=bugId).admins
            users_with = Bugs.objects.get(pk=bugId).users_with

            #empty the admins list
            for admin in admins.all():
                admins.remove(admin)

            #empty the users list
            for user in users_with.all():
                users_with.remove(user)

            #add admins
            for admin in new_admins:
                admins.add(User.objects.get(username=admin))

            #add users
            for user in new_users:
                users_with.add(User.objects.get(username=user))
        
        #catch errors
        except:
            return JsonResponse({"message": "Cannot save the updates!"}, status=201)

        return JsonResponse({"bug": Bugs.objects.get(pk=bugId).serialize()}, status=201)

    # If method not PUT
    return JsonResponse({"message": "Method should be PUT!"}, status=201)

@csrf_exempt
def delete_bug(request, bugId):
    #try get bug from db
    try:
        bug = Bugs.objects.get(pk=bugId)
    
    #catch errors
    except:
        return JsonResponse({"message": "Maybe you try delete a bug that doesn't exist!"}, status=201)
    
    # Check if user logged in
    if not request.user.username:
        return JsonResponse({"message": "No user logged in!"}, status=201)

    #Check if user have access to delete this bug
    if bug.user != request.user:
        return JsonResponse({"message": "User not allow to delete this bug!"}, status=201)

    #delete bug
    bug.delete()

    return JsonResponse({ "message": "Delete Successfully" }, status=201)

@csrf_exempt
def new_comment(request, on_bug):
    # check request method
    if request.method == 'POST':

        # Check if user logged in
        if not request.user.username:
            return JsonResponse({"message": "No user logged in!"}, status=201)

        # recieve data from frontend
        data = json.loads(request.body)

        content = data.get('content')

        #try to create new comment
        try:

            #create new comment
            new_comment = Comments.objects.create(user=request.user, on_bug=Bugs.objects.get(pk=on_bug), content=content)

            #save comment to the db
            new_comment.save()

        #catch errors
        except:
            return JsonResponse({"message": "Something wrong with the data sent!"}, status=201)

        return JsonResponse({"comment": new_comment.serialize()}, status=201)

    # If method not POST
    return JsonResponse({"message": "Method should be POST!"}, status=201)

@csrf_exempt
def edit_comment(request, commentId):
    #check request method
    if request.method == 'PUT':

        # Check if user logged in
        if not request.user.username:
            return JsonResponse({"message": "No user logged in!"}, status=201)

        #try find the comment in db
        try:
            comment = Comments.objects.get(pk=commentId)
        
        #catch errors (if no comment in db)
        except:
            return JsonResponse({"message": "No Comment in database!"}, status=201)

        #Check if user have access to edit this comment
        if comment.user != request.user:
            return JsonResponse({"message": "User not allow to edit this comment!"}, status=201)

        # recieve data from frontend
        data = json.loads(request.body)

        new_content = data.get('content')

        #try update comment
        try:
            Comments.objects.filter(pk=commentId).update(content=new_content)
        
        #catch errors
        except:
            return JsonResponse({"message": "Cannot save the updates!"}, status=201)

        return JsonResponse({"comment": Comments.objects.get(pk=commentId).serialize()}, status=201)

    # If method not PUT
    return JsonResponse({"message": "Method should be PUT!"}, status=201)

@csrf_exempt
def delete_comment(request, commentId):
    #try get comment from db
    try:
        comment = Comments.objects.get(pk=commentId)
    
    #catch errors
    except:
        return JsonResponse({"message": "Maybe you try delete a comment that doesn't exist!"}, status=201)
    
    # Check if user logged in
    if not request.user.username:
        return JsonResponse({"message": "No user logged in!"}, status=201)

    #Check if user have access to delete this comment
    if comment.user != request.user:
        return JsonResponse({"message": "User not allow to delete this comment!"}, status=201)

    #delete comment
    comment.delete()

    return JsonResponse({ "message": "Delete Successfully" }, status=201)