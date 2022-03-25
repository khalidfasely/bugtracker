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
    path("get_users", views.get_users, name="get_users_route"),
    path("new-project", views.new_project, name="new_project_route"),
    path("project/<int:on_project>/new-bug", views.new_bug, name="new_bug_route"),
    path("bug/<int:on_bug>/new-comment", views.new_comment, name="new_comment_route"),
    path("edit-comment/<int:commentId>", views.edit_comment, name="edit_comment_route"),
]