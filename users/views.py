from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework import generics, status
from .models import User,Account
from .serializers import UserSerializer,UserLoginSerializer, UserSignupSerializer,AccountSerializer,BalanceSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login,logout
from rest_framework import permissions 
from rest_framework.authentication import SessionAuthentication

def index(request):
    return render(request, 'users/index.html')

# class UserSignupAPIView(generics.CreateAPIView):
#     permission_classes = (permissions.AllowAny,)
#     queryset = User.objects.all()
#     serializer_class = UserSignupSerializer

class UserSignupAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    def perform_create(self, serializer):
        user = serializer.save()

        # Create an account for the user
        Account.objects.create(user=user, balance=0)


        
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


class DepositView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def patch(self, request, *args, **kwargs):
        account = self.get_object()
        amount = float(request.data.get('amount', 0))

        account.deposit(amount)
        serializer = self.get_serializer(account)
        return Response(serializer.data)

class BalanceView(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = BalanceSerializer

    def get_object(self):
        user = self.request.user
        account = get_object_or_404(Account, user=user)
        return account

class WithdrawView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def patch(self, request, *args, **kwargs):
        account = self.get_object()
        amount = float(request.data.get('amount', 0))

        try:
            account.withdraw(amount)
        except ValueError as e:
            return Response({'error': str(e)}, status=400)

        serializer = self.get_serializer(account)
        return Response(serializer.data)