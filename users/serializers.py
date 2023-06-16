from rest_framework import serializers
from .models import User,Account,Transaction,WithdrawalRequest,BankDetails,DepositRequest
from django.contrib.auth import authenticate
from django.dispatch import receiver
import shortuuid
from django.db.models.signals import pre_save
from django.db.models import Sum

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    comfirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['phone_number', 'password','comfirm_password', 'code']
        
    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('comfirm_password')

        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        return attrs

    def create(self, validated_data):
        validated_data.pop('comfirm_password')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')
        password = attrs.get('password')

        user = authenticate(phone_number=phone_number, password=password)
        if not user or not user.is_active:
            raise serializers.ValidationError('Invalid phone number or password.')

        attrs['user'] = user
        return attrs

class UserDetailSerializer(serializers.ModelSerializer):
    account_balance = serializers.SerializerMethodField()

    def get_account_balance(self, obj):
        return obj.account.balance

    class Meta:
        model = User
        fields = ['phone_number', 'account_balance']


class TotalIncomeSerializer(serializers.ModelSerializer):
    total_income = serializers.DecimalField(decimal_places=2, max_digits=10, read_only=True)

    class Meta:
        model = User
        fields = ['total_income']

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user','balance']
    
        
class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['phone_number','balance']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'amount', 'transaction_type', 'timestamp']


class WithdrawSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value
        
class DepositSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

class BankDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankDetails
        fields = '__all__'



class WithdrawalRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WithdrawalRequest
        fields = '__all__'
        read_only_fields = ['is_approved', 'status']

    def create(self, validated_data):
        withdrawal_request = WithdrawalRequest.objects.create(**validated_data)
        # Perform any additional logic here, if needed
        return withdrawal_request

class DepositRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositRequest
        fields = ['id', 'user', 'amount', 'timestamp', 'status', 'proof', 'narration']
        read_only_fields = ['user', 'timestamp', 'status']
        
    def create(self, validated_data):
        deposit_request = DepositRequest.objects.create(**validated_data)
        # Perform any additional logic here, if needed
        return deposit_request