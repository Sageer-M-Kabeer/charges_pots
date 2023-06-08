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
import PIL

def generate_invite_code():
    """
    Generate a unique invite code for the user consisting of random numbers.
    """
    length = 6
    while True:
        code = ''.join(random.choices(string.digits, k=length))
        if not User.objects.filter(invite_code=code).exists():
            return code
            
class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError('The phone number must be set')

        extra_fields.setdefault('is_active', True)
        
        # Check if the user exists based on the phone number
        existing_user = self.get_queryset().filter(phone_number=phone_number).first()
        if existing_user:
            return existing_user

        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        # Create an Account for the user
        Account.objects.create(user=user)
        
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
    invite_code = models.CharField(max_length=8, default=generate_invite_code, blank=True, null=True)
    referral_code = models.CharField(max_length=6, unique=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)
    last_login = models.DateField(auto_now=True)
    vip_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def generate_invite_code(self):
        """
        Generate a unique invite code for the user.
        """
        length = 6
        while True:
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
            if not User.objects.filter(invite_code=code).exists():
                return code
    
    def save(self, *args, **kwargs):
        if not self.invite_code:
            self.invite_code = self.generate_invite_code()
        super().save(*args, **kwargs)
 
    def __str__(self):
        return f'{self.phone_number}'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
    
    def deduct_vip_price(self, price):
        if self.vip_price >= price:
            self.vip_price -= price
            self.save()
        else:
            raise ValueError('Insufficient balance for VIP purchase')
      
class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name="account")
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def deposit(self, amount):
        self.balance += amount
        self.save()

        # Create a deposit transaction
        Transaction.objects.create(user=self.user, amount=amount, transaction_type='deposit')

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            self.save()

            # Create a withdrawal transaction
            Transaction.objects.create(user=self.user, amount=amount, transaction_type='withdrawal')
        else:
            raise ValueError('Insufficient balance')

    def __str__(self):
        return f"{self.user.phone_number} - {self.balance}"
    
class Referral(models.Model):
    referred_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='referrals')
    referred_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='referred_by')
    timestamp = models.DateTimeField(auto_now_add=True)

class InviteCode(models.Model):
    code = models.CharField(max_length=6, unique=True)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=10, choices=[('deposit', 'Deposit'), ('withdrawal', 'Withdrawal'), ('referral', 'Referral')])
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.phone_number} - {self.transaction_type} - {self.amount}"
    



    