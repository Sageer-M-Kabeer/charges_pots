from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
import random
import string
from vip.models import Vip 


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

        # Generate and assign a slug to the user
        user.slug = slugify(user.phone_number)

        user.save(using=self._db)

        # Create an Account for the user
        Account.objects.create(user=user)

        # Create a Referral for the users
        ReferralTeam.objects.create(user=user) 

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
    slug = models.SlugField(max_length=255, unique=True, null=True, blank=True)
    invite_code = models.CharField(max_length=8, unique=True, blank=True, null=True)
    referral_code = models.CharField(max_length=6, unique=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)
    last_login = models.DateField(auto_now=True)
    vip_level = models.ForeignKey(Vip, on_delete=models.CASCADE, null=True)
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def generate_invite_code(self):
        """
        Generate a unique invite code for the user.
        """
        length = 6
        while True:
            code = ''.join(random.choices(string.digits, k=length))
            if not User.objects.filter(invite_code=code).exists():
                return code
    
    def save(self, *args, **kwargs):
        if not self.invite_code:
            self.invite_code = self.generate_invite_code()
        if not self.slug:
            self.slug = slugify(self.phone_number)
        super().save(*args, **kwargs)
 
    def __str__(self):
        return f'{self.phone_number}'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True
    
    def deduct_vip_price(self, price):
        if self.account.balance >= price:
            self.account.balance -= price
            self.account.save()
        else:
            raise ValueError('Insufficient balance for VIP purchase')





class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="account")
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0,)

    def deposit(self, amount):
        if amount < 3000:
            raise ValueError('Minimum deposit amount is 3000')

        self.balance += amount
        self.save()

        # Create a deposit transaction
        Transaction.objects.create(user=self.user, amount=amount, transaction_type='deposit')

    def withdraw(self, amount):
        vip_level = self.user.viplevel.vip_level

        if vip_level > 0:
            if self.balance >= amount:
                self.balance -= amount
                self.save()

                # Create a withdrawal transaction
                Transaction.objects.create(user=self.user, amount=amount, transaction_type='withdrawal')
            else:
                raise ValueError('Insufficient balance')
        else:
            raise ValueError('VIP level is required to make a withdrawal')

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
    transaction_type = models.CharField(
        max_length=10,
        choices=[('deposit', 'Deposit'), ('withdrawal', 'Withdrawal'), ('referral', 'Referral')]
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.phone_number} - {self.transaction_type} - {self.amount}"

class BankDetails(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='bankdetails')
    account_name = models.CharField(max_length=25)
    account_number =models.CharField(max_length=10)
    bank_name = models.CharField(max_length=80,choices=[
        ("first_bank" , "First Bank"),
        ("fCM" , "First City Monument Bank"),
        ("Access Bank Plc","Access Bank Plc"),
        ("Fidelity Bank Plc","Fidelity Bank Plc"),
        ("First Bank of Nigeria Limited","First Bank of Nigeria Limited"),
        ("Guaranty Trust Holding Company Plc","Guaranty Trust Holding Company Plc"),
        ("Union Bank of Nigeria Plc","Union Bank of Nigeria Plc"),
        ("United Bank for Africa Plc","United Bank for Africa Plc"),
        ("Zenith Bank Plc","Zenith Bank Plc"),
        ("Citibank Nigeria Limited","Citibank Nigeria Limited"),
        ("Ecobank Nigeria","Ecobank Nigeria"),
        ("Heritage Bank Plc","Heritage Bank Plc"),
        ("Keystone Bank Limited","Keystone Bank Limited"),
        ("Optimus Bank Limited","Optimus Bank Limited"),
        ("Polaris Bank Limited. The successor to Skye Bank Plc","Polaris Bank Limited. The successor to Skye Bank Plc"),
        ("Stanbic IBTC Bank Plc","Stanbic IBTC Bank Plc"),
        ("Standard Chartered","Standard Chartered"),
        ("Sterling Bank Plc","Sterling Bank Plc"),
        ("Titan Trust bank","Titan Trust bank"),
        ("Unity Bank Plc","Unity Bank Plc"),
        ("Wema Bank Plc","Wema Bank Plc"),
        ("FairMoney Microfinance Bank","FairMoney Microfinance Bank"),
        ("Sparkle Bank","Sparkle Bank"),
        ("Kuda Bank","Kuda Bank"),
        ("Moniepoint Microfinance Bank","Moniepoint Microfinance Bank"),
        ("Opay","Opay"),
        ("Palmpay","Palmpay"),
        ("Rubies Bank","Rubies Bank"),
        ("VFD Microfinance Bank","VFD Microfinance Bank"),
        ("Mint Finex MFB","Mint Finex MFB"),
        ("Mkobo MFB","Mkobo MFB"),
        ("Raven bank","Raven bank"),
        ("Guaranty Trust Holding Company Plc","Guaranty Trust Holding Company Plc"),
        ("Fidelity Bank Plc","Fidelity Bank Plc"),
    ])

    def __str__(self):
        return f"{self.user} {self.account_name} {self.account_number} {self.bank_name}"

class ReferralTeam(models.Model):
    user = models.ForeignKey(User,verbose_name=_("user"), on_delete=models.CASCADE)
    # vip_level = models.OneToOneField(Vip,verbose_name=_("user"), on_delete=models.CASCADE)
    numbers_of_invites = models.IntegerField(default=0)
    team_recharge = models.DecimalField(default=0,decimal_places=2,max_digits=10)
    comissions = models.DecimalField(default=0,decimal_places=2,max_digits=10) 
    investing_reward = models.DecimalField(default=0,decimal_places=2,max_digits=10)

class UploadCashOutProof(models.Model):
    pass


class WithdrawalRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    bank_details = models.ForeignKey(BankDetails, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def approve(self):
        self.status = 'approved'
        self.save()

        # Process the withdrawal
        self.user.account.withdraw(self.amount)

    def reject(self):
        self.status = 'rejected'
        self.save()


class DepositRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="deposit_requested_user")
    amount = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    proof = models.ImageField(upload_to="media/deposit_proofs/")
    narration = models.TextField(max_length=120)
    is_approved = models.BooleanField(default=False)


    def approve(self):
        self.status = 'approved'
        self.save()

        # Process the withdrawal
        self.user.account.deposit(self.amount)

    def reject(self):
        self.status = 'rejected'
        self.save()