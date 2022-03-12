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

class Classification(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=25)

    def __str__(self):
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

class Comments(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    on_bug = models.ForeignKey(Bugs, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} ** {self.on_bug.id}'