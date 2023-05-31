from rest_framework import serializers
from .models import User,Account
from django.contrib.auth import authenticate
from django.dispatch import receiver
import shortuuid
from django.db.models.signals import pre_save

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    comfirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['phone_number', 'password','comfirm_password', 'invite_code']
        
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'balance','invite_code']


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user','balance']
    
        
class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user','balance']

