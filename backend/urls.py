from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_route, name="login_route"),
    path("logout", views.logout_route, name="logout_route"),
    path("register", views.register, name="register_route"),
]