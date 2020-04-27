from django.shortcuts import render

# Create your views here.


def home_page_start(request):
    return render(request=request, template_name="home/home.html")


def create_meeting_now(request):
    return render(request=request, template_name="create/create.html")
