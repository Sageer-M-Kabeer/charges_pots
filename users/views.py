from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework import generics, status
from .models import User,Account,Transaction,DepositRequest,BankDetails
from django.utils import timezone
from .serializers import (TotalIncomeSerializer, UserDetailSerializer,UserLoginSerializer, UserSignupSerializer,AccountSerializer,
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
from vip.models import Vip
from decimal import Decimal, ROUND_DOWN
from django.db.models import Sum


class WithdrawalRequestView(generics.CreateAPIView):
    queryset = WithdrawalRequest.objects.all()
    serializer_class = WithdrawalRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user

        # Check if the user has provided bank details
        bank_details = user.bankdetails.first()
        if not bank_details:
            raise ValidationError("Bank details are required for withdrawal.")

        withdrawal_request = serializer.save(user=user, bank_details=bank_details)

        # Check if the withdrawal amount is greater than the user's account balance
        if withdrawal_request.amount > user.account.balance:
            raise ValidationError("Insufficient account balance for withdrawal.")

        # Calculate the service fee
        service_fee_percentage = Decimal('0.1')
        service_fee = withdrawal_request.amount * service_fee_percentage

        # Deduct the service fee from the withdrawal amount
        adjusted_withdrawal_amount = withdrawal_request.amount - service_fee

        # Create a transaction for the withdrawal request
        transaction = Transaction.objects.create(
            user=user,
            amount=adjusted_withdrawal_amount,
            transaction_type='withdrawal',
            status='pending',
            timestamp=timezone.now(),
        )

        # Associate the transaction with the withdrawal request
        withdrawal_request.transaction = transaction
        withdrawal_request.save()

        # Update the user account balance
        user.account.balance -= withdrawal_request.amount
        user.account.save()

        # Update the transaction status if the withdrawal request is approved or rejected
        if withdrawal_request.status in ['successful', 'failed']:
            transaction.status = withdrawal_request.status
            transaction.save()




class DepositRequestView(generics.CreateAPIView):
    queryset = DepositRequest.objects.all()
    serializer_class = DepositRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
            deposit_request = serializer.save(user=self.request.user)

            # Check if the deposit amount is greater than or equal to 3000
            if deposit_request.amount < 3000:
                raise ValidationError("Minimum deposit amount is 3000.")

            # Create a transaction for the deposit
            transaction = Transaction.objects.create(
                user=self.request.user,
                amount=deposit_request.amount,
                transaction_type='deposit',
                status='pending',
                timestamp=timezone.now(),
            )

            # Associate the transaction with the deposit request
            deposit_request.transaction = transaction
            deposit_request.save()

            # Update the transaction status based on the deposit request approval/rejection
            if deposit_request.status == 'successful':
                transaction.status = 'approved'
            elif deposit_request.status == 'failed':
                transaction.status = 'rejected'
            transaction.save()

            # Update the transaction status if the deposit request is approved or rejected
            if deposit_request.status in ['successful', 'failed']:
                transaction.status = deposit_request.status
                transaction.save()
            
            # Update the user's total_income
            total_income = DepositRequest.objects.filter(user=self.request.user, status='approved').aggregate(Sum('amount'))
            self.request.user.account.total_income = total_income['amount__sum'] or 0
            self.request.user.account.save()


class UserSignupAPIView(generics.CreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    def perform_create(self, serializer):
        referral_code = self.request.data.get('code')
        referred_by = None

        if referral_code:
            try:
                referred_by = User.objects.get(profile__code=referral_code)
            except User.DoesNotExist:
                raise ValidationError("Referral code does not exist.")
        else:
            raise ValidationError("Referral code is required for registration.")

        user = serializer.save(referred_by=referred_by)

        # Create a Profile for the user
        Profile.objects.create(user=user)

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


class TotalIncomeView(generics.RetrieveAPIView):
    serializer_class = TotalIncomeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        total_income = DepositRequest.objects.filter(user=user, status='approved').aggregate(Sum('amount'))
        return {
            'user': user.phone_number,  # Retrieve the username
            'total_income': total_income['amount__sum'] or 0
        }
    
        
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


class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


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


