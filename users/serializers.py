from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['phone_number', 'password', 'invite_code']

    def create(self, validated_data):
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
        fields = ['id', 'phone_number', 'invite_code']
