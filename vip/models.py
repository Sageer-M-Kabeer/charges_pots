from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime, timedelta

class VipLevel(models.Model):
    name = models.CharField(max_length=25, null=True)
    level = models.IntegerField(unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    daily_income = models.DecimalField(max_digits=10, decimal_places=2)
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2)
    circle_days = models.IntegerField(null=True)
    is_expired = models.BooleanField(default=False)
    
    @property
    def calculated_date(self):
        if self.circle_days:
            current_date = datetime.now().date()
            calculated_date = current_date + timedelta(days=self.circle_days)
            return calculated_date
        return None

    def __str__(self):
        return f'VIP Level {self.level}: VIP Price {self.price}'

class Vip(models.Model):
    level = models.ForeignKey(VipLevel, on_delete=models.CASCADE)
    
    # user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="+")

    def __str__(self):
        return f'VIP-Level: {self.level}'

    def save(self, *args, **kwargs):
        if not self.pk:
            self.total_revenue = 0.0
            self.circle_days = timezone.now() + timedelta(days=self.level.circle_days)
        super().save(*args, **kwargs)

    def purchase_vip_level(self):
        user = self.user
        vip_level = self.level
        user.account_balance -= vip_level.price  # Deduct the price from the user's account balance
        user.save()  # Save the updated account balance
        self.circle_days = vip_level.circle_days  # Update the circle days
        self.save()  # 

    def reset_level(self):
        self.level = 0
        self.price = 0
        self.daily_income = 0
        self.total_revenue = 0
        self.circle_days = 0
        self.save()



@receiver(post_save, sender=Vip)
def start_daily_income_calculation(sender, instance, created, **kwargs):
    if created:
        # New VIP created, start daily income calculation after 24 hours
        instance.last_income_calculation = timezone.now() + timedelta(hours=24)
        instance.save()
