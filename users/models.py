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

    def generate_invite_code(self):
        """
        Generate a unique invite code for the user.
        """
        length = 6
        while True:
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
            if not User.objects.filter(invite_code=code).exists():
                return code
            
    def __str__(self):
        return f'{self.phone_number}'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
    
class Profile(models.Model):
    """ Default profile """

    user = models.OneToOneField(User,
                                unique=True,
                                verbose_name=_('user'),
                                related_name='profile',on_delete=models.CASCADE)
    invite_code = models.CharField(max_length=300, blank=True, null=True)

    def generate_verification_code(self):
        # Generate user's verification code
        # TODO: Move this to the model
        return base64.urlsafe_b64encode(uuid.uuid1().bytes.encode("base64").rstrip())[:25]

    def save(self, *args, **kwargs):
        """
        If this is a new user, generate code.
        Otherwise leave as is
        """
        if not self.pk:
            self.referral_code = self.generate_verification_code()
        elif not self.verification_code:
            self.referral_code = self.generate_verification_code()

        return super(Profile, self).save(*args, **kwargs)
    
class Account(models.Model):
    user = models.ForeignKey(User, verbose_name=_("user"),related_name='account', on_delete=models.CASCADE)
    balance = models.IntegerField()
    
    def __str__(self) -> str:
        return str(self.balance)
    
    def get_balance(self):
        return f"{self.balance}"
    
    



    