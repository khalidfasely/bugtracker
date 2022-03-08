from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Classification(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=25)

    def __str__(self):
        return self.description

class Bugs(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creater')
    users_with = models.ManyToManyField(User, related_name='group_users')
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