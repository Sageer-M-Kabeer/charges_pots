from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework import generics, status
from .models import User,Account,Transaction,InviteCode,Referral,DepositRequest,BankDetails

from .serializers import (UserSerializer,UserLoginSerializer, UserSignupSerializer,AccountSerializer,
BalanceSerializer,TransactionSerializer,WithdrawSerializer,DepositSerializer,BalanceSerializer,WithdrawalRequestSerializer
,DepositRequestSerializer)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login,logout
from rest_framework import permissions 
from rest_framework.authentication import SessionAuthentication
import random
from rest_framework.exceptions import ValidationError
from .models import WithdrawalRequest




class WithdrawalRequestView(generics.CreateAPIView):
    queryset = WithdrawalRequest.objects.all()
    serializer_class = WithdrawalRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Get the bank details for the authenticated user
        bank_details = self.request.user.bankdetails.first()
        # Set the user and bank_details fields in the serializer
        serializer.save(user=self.request.user, bank_details=bank_details)

class DepositRequestView(generics.CreateAPIView):
    queryset = DepositRequest.objects.all()
    serializer_class = DepositRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Get the bank details for the authenticated user
        # Set the user and bank_details fields in the serializer
        serializer.save(user=self.request.user)


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
        referral_code = self.request.data.get('referral_code')
        referred_by = None

        if referral_code:
            try:
                referred_by = User.objects.get(referral_code=referral_code)
            except User.DoesNotExist:
                raise ValidationError("Referral code does not exist.")
        else:
            raise ValidationError("Referral code is required for registration.")

        user = serializer.save(referred_by=referred_by)

        # Create an account for the user
        Account.objects.create(user=user, balance=0)

        if referred_by:
            # Increase the referral count of the referrer
            referred_by.referral_count += 1
            referred_by.save()

            # Add bonus to the referred user's account
            referred_user_bonus = 1000
            user.account.balance += referred_user_bonus
            user.account.save()

            # Add referral transaction for the referrer
            referral_bonus = user.account.balance * 0.1
            Transaction.objects.create(user=referred_by, amount=referral_bonus, transaction_type='referral')

        # Generate a unique 6-digit invite code for the user
        invite_code = self.generate_invite_code()
        InviteCode.objects.create(code=invite_code, owner=user)

    def generate_invite_code(self):
        # Generate a unique 6-digit invite code
        while True:
            invite_code = str(random.randint(100000, 999999))
            if not InviteCode.objects.filter(code=invite_code).exists():
                return invite_code


        
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

class UserDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [SessionAuthentication,]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class DepositView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = DepositSerializer
    permission_classes = [IsAuthenticated]


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        amount = serializer.validated_data['amount']

        # Retrieve the account for the authenticated user
        account = request.user.account

        # Perform the deposit operation
        account.deposit(amount)

        return Response({'message': 'Deposit successful'}, status=200)



class WithdrawView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = WithdrawSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        amount = serializer.validated_data['amount']

        # Retrieve the account for the authenticated user
        account = request.user.account

        # Perform the withdrawal operation
        try:
            account.withdraw(amount)
        except ValueError as e:
            return Response({'error': str(e)}, status=400)

        return Response({'message': 'Withdrawal successful'}, status=200)


class AccountBalanceView(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_object(self):
        user = self.request.user
        return self.queryset.get(user=user)

class UserBalanceView(APIView):
    permission_classes = [IsAuthenticated]

    serializer_class = BalanceSerializer

    def get(self, request, *args, **kwargs):
        user = request.user

        try:
            account = Account.objects.get(user=user)
        except Account.DoesNotExist:
            return Response({'detail': 'Account not found'}, status=404)

        return Response({'balance': account.balance}, status=200)

class DepositHistoryView(generics.ListAPIView):
    queryset = Transaction.objects.filter(transaction_type='deposit')
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

class WithdrawalHistoryView(generics.ListAPIView):
    queryset = Transaction.objects.filter(transaction_type='withdrawal')
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

class ReferralCountView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

    def get_object(self):
        user = self.request.user
        return self.queryset.get(pk=user.pk)

    def retrieve(self, request, *args, **kwargs):
        user = self.get_object()
        referral_count = user.referrals.count()
        return Response({'referral_count': referral_count})
