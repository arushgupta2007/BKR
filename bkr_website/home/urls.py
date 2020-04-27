from django.urls import path
from . import views

app_name = "home"

urlpatterns = [
    path('', views.home_page_start, name='home_page_start'),
    path('create_new/', views.create_meeting_now, name='create_new'),
]
