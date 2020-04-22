from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def home_page_start(request):
    return render(request=request, template_name="home/home.html")
