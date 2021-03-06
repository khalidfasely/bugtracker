from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    admins = models.ManyToManyField(User, related_name='admins_project')
    users_with = models.ManyToManyField(User, related_name='users_project')
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} ** {self.id}'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "time": self.time.strftime("%b %d %Y, %I:%M %p"),
            "user": {
                "id": self.user.id,
                "username": self.user.username
            },
            "admins": [admin.username for admin in self.admins.all()],
            "users_with": [user.username for user in self.users_with.all()]
        }

    def is_valid(self):
        return self.name and self.user and self.admins.count() > 0 and self.users_with.count() > 0

class Classification(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=25)

    def __str__(self):
        return self.description
    
    def is_valid(self):
        return self.description

class Bugs(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255)
    on_project = models.ForeignKey(Project, on_delete=models.CASCADE, default=None, related_name='project_on')
    active = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creater')
    admins = models.ManyToManyField(User, related_name='admins_bug')
    users_with = models.ManyToManyField(User, related_name='users_bug')
    classification = models.ForeignKey(Classification, on_delete=models.PROTECT)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} ** {self.title}'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "classification": self.classification.description,
            "active": self.active,
            "on_project": self.on_project.id,
            "time": self.time.strftime("%b %d %Y, %I:%M %p"),
            "user": {
                "id": self.user.id,
                "username": self.user.username
            },
            "admins": [admin.username for admin in self.admins.all()],
            "users_with": [user.username for user in self.users_with.all()]
        }

    def is_valid(self):
        return self.title and self.description and self.on_project and self.user and self.classification and self.active and self.admins.count() > 0 and self.users_with.count() > 0

class Comments(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    on_bug = models.ForeignKey(Bugs, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} ** {self.on_bug.id}'

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "user": {
                "id": self.user.id,
                "username": self.user.username
            },
            "on_bug": self.on_bug.id,
            "time": self.time.strftime("%b %d %Y, %I:%M %p")
        }

    def is_valid(self):
        return self.content and self.user and self.on_bug