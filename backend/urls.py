from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("user", views.user, name="user_route"),
    path("login", views.login_route, name="login_route"),
    path("logout", views.logout_route, name="logout_route"),
    path("register", views.register, name="register_route"),
    path("projects", views.projects, name="projects_route"),
    path("project/<int:pid>", views.project, name="project_route"),
    path("project/<int:pid>/bug/<int:bid>", views.bug, name="bug_route"),
]