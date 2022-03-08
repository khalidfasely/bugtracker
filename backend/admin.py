from django.contrib import admin

from .models import Classification, Bugs, Comments

# Register your models here.
admin.site.register(Bugs)
admin.site.register(Comments)
admin.site.register(Classification)