from django.urls import path
from . import views

app_name = "home"

urlpatterns = [
    path('', views.home_page_start, name='home_page_start'),
]
