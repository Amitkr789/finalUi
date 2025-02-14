"""
URL configuration for LeadSoft project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from home import views
# from home import submit_form
urlpatterns = [
   path("", views.index, name='home'),
   path("UserCreate", views.createUser, name='UserCreate'),
   path("actionUser", views.RegistrationUser, name='RegistrationUser'),
   path("login", views.login , name='Login'),
   path("loginAction", views.loginAction , name='loginAction'),
   path("LeadManagement", views.LeadManagement , name='LeadManagement'),
   path("LogoutUser", views.LogoutUser , name='LogoutUser'),
   path("LeadAction", views.CreateLead , name='CreateLead'),
   path("LeadAction", views.CreateLead , name='CreateLead'),
   path("Calender", views.MyCalender , name='MyCalender'),
   path("Profile", views.MyProfile , name='MyProfile')
]
