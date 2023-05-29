from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from .models import User
from .serializers import UserSerializer,UserLoginSerializer, UserSignupSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login,logout
from rest_framework import permissions 
from rest_framework.authentication import SessionAuthentication

def index(request):
    return render(request, 'users/index.html')

class UserSignupAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
        
class UserLoginAPIView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = [SessionAuthentication,]
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        login(request, user)

        return Response({'detail': 'Logged in successfully.'}, status=status.HTTP_200_OK)
    
class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [SessionAuthentication,]

    def post(self, request):
        logout(request)
        return Response({'detail': 'Logged out successfully.'}, status=status.HTTP_200_OK)

class UserListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [SessionAuthentication,]
    queryset = User.objects.all()
    serializer_class = UserSerializer
\
class UserDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [SessionAuthentication,]
    queryset = User.objects.all()
    serializer_class = UserSerializer