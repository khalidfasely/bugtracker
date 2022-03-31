from json import JSONDecoder
import json
from django.http import JsonResponse
from django.test import TestCase, Client
from django.urls import reverse, resolve
from django.contrib.auth import get_user_model

from .views import login_route, logout_route, register, get_users, select_users, bug, new_bug, edit_bug, delete_bug, new_comment, edit_comment, delete_comment, projects, project, new_project, edit_project, delete_project
# Create your tests here.

from .models import User, Project, Bugs, Classification, Comments

class TestWithData(TestCase):
    #Create dummy data
    def setUp(self):
        #Users
        u1 = User.objects.create(username="Admin", email="Admin@admin.admin", password="0000")
        u2 = User.objects.create(username="Admin2", email="Admin2@admin.admin", password="00002")
        u3 = User.objects.create(username="1", email="1@1.1", password="1")
        u4 = User.objects.create(username="Admin3", email="Admin@admin.admin", password="0000")
        u5 = User.objects.create(username="2", email="Admin2@admin.admin", password="00002")

        #Classifications
        c1 = Classification.objects.create(description='high')
        c2 = Classification.objects.create(description='medium')
        c3 = Classification.objects.create(description='low')

        #Projects
        p1 = Project.objects.create(name='Project one', user=u1)
        p1.admins.set([u1, u2])
        p1.users_with.set([u1, u2, u3])
        p2 = Project.objects.create(name='Project two', user=u3)
        p2.admins.set([u3, u4])
        p2.users_with.set([u3, u4, u5])
        p3 = Project.objects.create(user=u4)

        #Bugs
        b1 = Bugs.objects.create(title='Bug one', description='Button on hover doesn\'t work', user=u1, active=True, classification=c2, on_project=p1)
        b1.admins.set([u1])
        b1.users_with.set([u1, u3])
        b2 = Bugs.objects.create(title='Bug two', description='Button on click doesn\'t work', user=u5, active=True, classification=c1, on_project=p2)
        b2.admins.set([u5, u4])
        b2.users_with.set([u5, u4, u3])
        b3 = Bugs.objects.create(title='Bug three', user=u5, active=True, classification=c1, on_project=p2)

        #Comments
        cm1 = Comments.objects.create(content='Comment one', user=u1, on_bug=b1)
        cm2 = Comments.objects.create(content='Comment two', user=u3, on_bug=b2)
        cm3 = Comments.objects.create(content='', user=u4, on_bug=b2)

    #TestModels
    ##Test Counts
    def test_users_count(self):
        u = User.objects.all()
        self.assertEqual(u.count(), 5)

    def test_classifications_count(self):
        c = Classification.objects.all()
        self.assertEqual(c.count(), 3)

    def test_projects_count(self):
        p = Project.objects.all()
        self.assertEqual(p.count(), 3)

    def test_bugs_count(self):
        b = Bugs.objects.all()
        self.assertEqual(b.count(), 3)

    def test_comments_count(self):
        cm = Comments.objects.all()
        self.assertEqual(cm.count(), 3)

    def test_projects_count_2(self):
        p = Project.objects.filter(user=User.objects.get(username="Admin"))
        self.assertEqual(p.count(), 1)

    def test_bugs_count_2(self):
        b = Bugs.objects.filter(title='Bug one')
        self.assertEqual(b.count(), 1)
    
    def test_comments_count_2(self):
        cm = Comments.objects.filter(content='Not found')
        self.assertEqual(cm.count(), 0)

    ##Test Validations
    def test_valid_classification(self):
        c = Classification.objects.get(description='low')
        self.assertTrue(c.is_valid())
    
    def test_valid_project(self):
        p = Project.objects.get(name='Project one')
        self.assertTrue(p.is_valid())

    def test_invalid_project(self):
        p = Project.objects.get(user=User.objects.get(username="Admin3"))
        self.assertFalse(p.is_valid())

    def test_valid_bug(self):
        b = Bugs.objects.get(title='Bug one')
        self.assertTrue(b.is_valid())

    def test_invalid_bug(self):
        b = Bugs.objects.get(title='Bug three')
        self.assertFalse(b.is_valid())

    def test_valid_comment(self):
        cm = Comments.objects.get(content='Comment one')
        self.assertTrue(cm.is_valid())

    def test_invalid_comment(self):
        cm = Comments.objects.get(user=User.objects.get(username='Admin3'))
        self.assertFalse(cm.is_valid())

    ##Test counts two
    def test_project_count_with_user(self):
        u = User.objects.get(username='Admin')
        p = Project.objects.filter(user=u)
        self.assertEqual(p.count(), 1)

    def test_project_count_with_user_2(self):
        u = User.objects.get(username='2')
        p = Project.objects.filter(user=u)
        self.assertEqual(p.count(), 0)

    def test_bug_count_with_user(self):
        u = User.objects.get(username='Admin')
        b = Bugs.objects.filter(user=u)
        self.assertEqual(b.count(), 1)

    def test_bug_count_with_user_2(self):
        u = User.objects.get(username='2')
        b = Bugs.objects.filter(user=u)
        self.assertEqual(b.count(), 2)
    
    def test_comment_count_with_user(self):
        u = User.objects.get(username='Admin')
        cm = Comments.objects.filter(user=u)
        self.assertEqual(cm.count(), 1)

    def test_comment_count_with_user_2(self):
        u = User.objects.get(username='2')
        cm = Comments.objects.filter(user=u)
        self.assertEqual(cm.count(), 0)

    def test_comment_count_on_bug(self):
        p = Project.objects.get(name='Project one')
        b = Bugs.objects.filter(on_project=p)
        self.assertEqual(b.count(), 1)

class TestsWithoutData(TestCase):
    #Test Urls
    def test_login_url(self):
        url = reverse('login_route')
        self.assertEqual(resolve(url).func, login_route)

        c = Client()
        response = c.get("/api/login")
        expected_res = b'{"message": "The method must be POST"}'
        self.assertEqual(response.content, expected_res)

    def test_logout_url(self):
        url = reverse('logout_route')
        self.assertEqual(resolve(url).func, logout_route)

        c = Client()
        response = c.get("/api/logout")
        expected_res = b'{"message": "You are not logged in!"}'
        self.assertEqual(response.content, expected_res)

    def test_register_url(self):
        url = reverse('register_route')
        self.assertEqual(resolve(url).func, register)

        c = Client()
        response = c.get("/api/register")
        expected_res = b'{"message": "The method must be POST"}'
        self.assertEqual(response.content, expected_res)

    def test_projects_url(self):
        url = reverse('projects_route')
        self.assertEqual(resolve(url).func, projects)

        c = Client()
        response = c.get("/api/projects")
        expected_res = b'{"projects": []}'
        self.assertEqual(response.content, expected_res)

    def test_project_url(self):
        url = reverse('project_route', args=[1])
        self.assertEqual(resolve(url).func, project)

        c = Client()
        response = c.get("/api/project/1")
        expected_res = b'{"message": "Project Not Found!"}'
        self.assertEqual(response.content, expected_res)

    def test_bug_url(self):
        # first arg for projectId, the second for bugId
        url = reverse('bug_route', args=[2, 1])
        self.assertEqual(resolve(url).func, bug)

        c = Client()
        response = c.get("/api/project/1/bug/1")
        expected_res = b'{"message": "This bug doesn\'t exist!"}'
        self.assertEqual(response.content, expected_res)
    
    def test_get_users_url(self):
        url = reverse('get_users_route')
        self.assertEqual(resolve(url).func, get_users)

        c = Client()
        response = c.get("/api/get_users")
        expected_res = b'{"users": []}'
        self.assertEqual(response.content, expected_res)

    def test_select_users_url(self):
        url = reverse('select_users_route', args=[1])
        self.assertEqual(resolve(url).func, select_users)

        c = Client()
        response = c.get("/api/select_users/1")
        expected_res = b'{"message": "Something goes wrong!"}'
        self.assertEqual(response.content, expected_res)

    def test_new_project_url(self):
        url = reverse('new_project_route')
        self.assertEqual(resolve(url).func, new_project)

        c = Client()
        response = c.get("/api/new-project")
        expected_res = b'{"message": "Method should be POST!"}'
        self.assertEqual(response.content, expected_res)

    def test_edit_project_url(self):
        url = reverse('edit_project_route', args=[2])
        self.assertEqual(resolve(url).func, edit_project)

        c = Client()
        response = c.get("/api/edit-project/1")
        expected_res = b'{"message": "Method should be PUT!"}'
        self.assertEqual(response.content, expected_res)

    def test_delete_project_url(self):
        url = reverse('delete_project_route', args=[2])
        self.assertEqual(resolve(url).func, delete_project)

        c = Client()
        response = c.get("/api/delete-project/1")
        expected_res = b'{"message": "Maybe you try delete a project that doesn\'t exist!"}'
        self.assertEqual(response.content, expected_res)

    def test_new_bug_url(self):
        url = reverse('new_bug_route', args=[1])
        self.assertEqual(resolve(url).func, new_bug)

        c = Client()
        response = c.get("/api/project/1/new-bug")
        expected_res = b'{"message": "Method should be POST!"}'
        self.assertEqual(response.content, expected_res)

    def test_edit_bug_url(self):
        url = reverse('edit_bug_route', args=[2])
        self.assertEqual(resolve(url).func, edit_bug)

        c = Client()
        response = c.get("/api/edit-bug/1")
        expected_res = b'{"message": "Method should be PUT!"}'
        self.assertEqual(response.content, expected_res)

    def test_delete_bug_url(self):
        url = reverse('delete_bug_route', args=[2])
        self.assertEqual(resolve(url).func, delete_bug)

        c = Client()
        response = c.get("/api/delete-bug/1")
        expected_res = b'{"message": "Maybe you try delete a bug that doesn\'t exist!"}'
        self.assertEqual(response.content, expected_res)

    def test_new_comment_url(self):
        url = reverse('new_comment_route', args=[1])
        self.assertEqual(resolve(url).func, new_comment)

        c = Client()
        response = c.get("/api/bug/1/new-comment")
        expected_res = b'{"message": "Method should be POST!"}'
        self.assertEqual(response.content, expected_res)

    def test_edit_comment_url(self):
        url = reverse('edit_comment_route', args=[2])
        self.assertEqual(resolve(url).func, edit_comment)

        c = Client()
        response = c.get("/api/edit-comment/1")
        expected_res = b'{"message": "Method should be PUT!"}'
        self.assertEqual(response.content, expected_res)

    def test_delete_comment_url(self):
        url = reverse('delete_comment_route', args=[2])
        self.assertEqual(resolve(url).func, delete_comment)

        c = Client()
        response = c.get("/api/delete-comment/1")
        expected_res = b'{"message": "Maybe you try delete a comment that doesn\'t exist!"}'
        self.assertEqual(response.content, expected_res)

class TestsWithPostPutData(TestCase):
    def test_get_login_route(self):
        c = Client()
        response = c.get(reverse('login_route'))
        expected_res = b'{"message": "The method must be POST"}'
        self.assertEqual(response.content, expected_res)

    def test_post_login_route_with_data(self):
        c = Client()
        jsondata=json.dumps({'username': 'Admin', 'password': '0000'})
        response = c.post(reverse('login_route'), content_type=jsondata)
        expected_res = b'{"message": "Invalid username and/or password."}'
        self.assertEqual(response.content, expected_res)

    def test_post_login_route_without_data(self):
        c = Client()
        response = c.post(reverse('login_route'))
        expected_res = b'{"message": "No data send with the request."}'
        self.assertEqual(response.content, expected_res)

    def test_get_register_route(self):
        c = Client()
        response = c.get(reverse('register_route'))
        expected_res = b'{"message": "The method must be POST"}'
        self.assertEqual(response.content, expected_res)

    def test_post_register_route_with_data(self):
        c = Client()
        #csrf_client = Client(enforce_csrf_checks=True)
        jsondata=json.dumps({'username': 'Admin', 'email': 'email@c.om', 'password': '0000', 'confirmation': '0000'})
        response = c.post(reverse('register_route'), jsondata, content_type="application/x-www-form-urlencoded")### solution from https://medium.com/@fro_g/making-post-requests-work-with-django-tests-3d9ad539e11f
        expected_res = b'{"message": "Register correctly.", "user": {"username": "Admin", "uid": "112"}}'
        #expected_res = b'{"message": "Register correctly.", "user": {"username"[21 chars]1"}}'
        self.assertEqual(response.content, expected_res)

        # Post request with existing username
        jsondata=json.dumps({'username': 'Admin', 'email': 'emailzlkes@c.om', 'password': '0000', 'confirmation': '0000'})
        response = c.post(reverse('register_route'), jsondata, content_type="application/x-www-form-urlencoded")
        expected_res = b'{"message": "Username already taken."}'
        self.assertEqual(response.content, expected_res)

    def test_post_register_route_with_different_pswrd(self):
        c = Client()
        jsondata=json.dumps({'username': 'Admin', 'email': 'emailzlkes@c.om', 'password': '0000', 'confirmation': '55'})
        response = c.post(reverse('register_route'), jsondata, content_type="application/x-www-form-urlencoded")
        expected_res = b'{"message": "Passwords must match"}'
        self.assertEqual(response.content, expected_res)

    def test_post_register_route_without_data(self):
        c = Client()
        response = c.post(reverse('register_route'))
        expected_res = b'{"message": "No data send with the request."}'
        self.assertEqual(response.content, expected_res)

    def test_get_new_project_route(self):
        c = Client()
        response = c.get(reverse('new_project_route'))
        expected_res = b'{"message": "Method should be POST!"}'
        self.assertEqual(response.content, expected_res)

    def test_post_new_project_route_with_no_user_logged_in(self):
        c = Client()
        response = c.post(reverse('new_project_route'))
        expected_res = b'{"message": "No user logged in!"}'
        self.assertEqual(response.content, expected_res)

    def test_post_new_project_route_with_user_logged_in(self):
        c = Client()

        #Create account and login
        data = json.dumps({'username': 'Admin', 'email': 'emailzlkes@c.om', 'password': '0000', 'confirmation': '0000'})
        response = c.post(reverse('register_route'), data, content_type="application/x-www-form-urlencoded")

        #with no data
        response = c.post(reverse('new_project_route'), content_type="application/x-www-form-urlencoded")
        expected_res = b'{"message": "Something wrong with the data sent!"}'
        self.assertEqual(response.content, expected_res)

    """def test_post_new_project_route_with_user_logged_in_and_data(self):
        c = Client()

        #Create account and login
        data = json.dumps({'username': 'Admin', 'email': 'emailzlkes@c.om', 'password': '0000', 'confirmation': '0000'})
        response = c.post(reverse('register_route'), data, content_type="application/x-www-form-urlencoded")

        #with data
        project_data = json.dumps({'name': 'Project', 'users': ['1', 'admin'], 'admins': ['1', 'admin']})
        response = c.post(reverse('new_project_route'), project_data, content_type="application/x-www-form-urlencoded")
        expected_res = b'{"message": "Saved correctly!", "project": "project"}'
        self.assertEqual(response.content, expected_res)"""

    def test_get_edit_project_route(self):
        c = Client()
        response = c.get(reverse('edit_project_route', args=[1]))
        expected_res = b'{"message": "Method should be PUT!"}'
        self.assertEqual(response.content, expected_res)

        response = c.post(reverse('edit_project_route', args=[1]))
        self.assertEqual(response.content, expected_res)

    def test_put_edit_project_route_with_no_user_logged_in(self):
        c = Client()
        response = c.put(reverse('edit_project_route', args=[1]))
        expected_res = b'{"message": "No user logged in!"}'
        self.assertEqual(response.content, expected_res)

    def test_put_edit_project_route_with_user_logged_in(self):
        c = Client()

        #Create account and login
        data = json.dumps({'username': 'Admin', 'email': 'emailzlkes@c.om', 'password': '0000', 'confirmation': '0000'})
        response = c.post(reverse('register_route'), data, content_type="application/x-www-form-urlencoded")

        #with no data
        response = c.put(reverse('edit_project_route', args=[1]), content_type="application/x-www-form-urlencoded")
        expected_res = b'{"message": "No Project in database!"}'
        self.assertEqual(response.content, expected_res)

    """Misses test with the right edited data for project"""

    def test_get_delete_project_route(self):
        c = Client()
        response = c.get(reverse('delete_project_route', args=[1]))
        expected_res = b'{"message": "Maybe you try delete a project that doesn\'t exist!"}'
        self.assertEqual(response.content, expected_res)

    """Misses test with the right id project in db"""