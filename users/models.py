import base64
import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator
import random
import string
from django.dispatch import receiver
import shortuuid
from django.db.models.signals import pre_save
from django.utils.translation import gettext_lazy as _

def generate_invite_code():
        """
        Generate a unique invite code for the user.
        """
        length = 6
        while True:
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
            if not User.objects.filter(invite_code=code).exists():
                return code
            
class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError('The phone number must be set')

        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(phone_number, password, **extra_fields)


class User(AbstractBaseUser):
    phone_number = PhoneNumberField(unique=True)
    invite_code = models.CharField(max_length=8,default= generate_invite_code, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)
    last_login = models.DateField(auto_now=True)
    

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    def save(self, *args, **kwargs):
        if not self.invite_code:
            self.invite_code = self.generate_invite_code()
        super().save(*args, **kwargs)

    # def generate_invite_code(self):
    #     """
    #     Generate a unique invite code for the user.
    #     """
    #     length = 6
    #     while True:
    #         code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
    #         if not User.objects.filter(invite_code=code).exists():
    #             return code
            
    def __str__(self):
        return f'{self.phone_number}'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
      
class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name="balance")
    balance = models.IntegerField(default=0)

    def deposit(self, amount):
        self.balance += amount
        self.save()

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            self.save()
        else:
            raise ValueError("Insufficient balance")

    def __str__(self):
        return f"Account for {self.user.phone_number}"
    
    



    