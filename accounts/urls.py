from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.registration_form, name='registration_form'),
    path('api/register/', views.UserRegistrationAPIView.as_view(), name='api_register'),
    path('api/users/', views.UserListAPIView.as_view(), name='api_users'),
]