from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse("Hello, world!")