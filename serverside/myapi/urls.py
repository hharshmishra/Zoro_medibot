from django.urls import path
from . import views

urlpatterns = [
    path('myapi/', views.my_api_view, name='my_api'),
    path('heyzoro/', views.heyzoro, name='heyzoro'),
]