from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import render
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer, UserSerializer

User = get_user_model()

class UserRegistrationAPIView(generics.CreateAPIView):
    """
    API endpoint for user registration
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_serializer = UserSerializer(user)
            return Response({
                'message': 'User registered successfully!',
                'user': user_serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Registration failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class UserListAPIView(generics.ListAPIView):
    """
    API endpoint to list all users (for testing purposes)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

def registration_form(request):
    """
    Render the registration form HTML page
    """
    return render(request, 'accounts/register.html')
