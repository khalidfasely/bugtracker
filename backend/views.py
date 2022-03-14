import json
from django.db import IntegrityError

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from django.http import HttpResponse, JsonResponse

from .models import Project, User

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
    all_projects = Project.objects.all()

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

    # Check if project is in db
    if project is None:
        return JsonResponse({"message": "Project Not Found!"}, status=201)

    if request.user.username not in [user.username for user in project.users_with.all()]:
        return JsonResponse({"project": def_project}, status=201)

    return JsonResponse({"project": project.serialize()}, status=201)