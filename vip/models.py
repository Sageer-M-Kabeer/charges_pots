from django.db import models
from django.utils import timezone
from users.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime, timedelta

class VipLevel(models.Model):
    name = models.CharField(max_length=25,null=True)
    level = models.IntegerField(unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    daily_income = models.DecimalField(max_digits=10, decimal_places=2)
    total_revenue = models.DecimalField(max_digits=10, decimal_places=2)
    circle_days = models.IntegerField(null=True)  # Number of days in the circle

    # Calculate the date based on the number of circle days
    @property
    def calculated_date(self):
        if self.circle_days:
            current_date = datetime.now().date()  # Get the current date
            calculated_date = current_date + timedelta(days=self.circle_days)
            return calculated_date
        return None

    def __str__(self):
        return f'VIP Level {self.level}: VIP Price {self.price}'

class Vip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.ForeignKey(VipLevel, on_delete=models.CASCADE)
    

    def __str__(self):
        return f'VIP: {self.user} - Level: {self.level}'

    def __str__(self):
        return f'Vip:{self.level}-{self.price}'

    def save(self, *args, **kwargs):
        if not self.pk:
            # New VIP creation
            self.total_revenue = 0.0
            self.circle_days = timezone.now() + timedelta(days=self.level)  # Set the circle_days based on VIP level
        super().save(*args, **kwargs)

    def purchase_vip_level(self):
        user = self.user
        user.deduct_vip_price(self.price)

        # Calculate the expiration date for the VIP membership
        self.circle_days = 30  # Example: VIP membership lasts for 30 days
        self.save()

    def reset_level(self):
        self.level = 0
        self.price = 0
        self.daily_income = 0
        self.total_revenue = 0
        self.circle_days = 0
        self.save()

        # Schedule a task to update total revenue daily
        # You need to implement the scheduling mechanism based on your choice of library (e.g., Celery, Django Background Tasks)

        # Start providing daily income after 24 hours
        # You need to implement the mechanism to start the daily income calculation after 24 hours





@receiver(post_save, sender=Vip)
def start_daily_income_calculation(sender, instance, created, **kwargs):
    if created:
        # New VIP created, start daily income calculation after 24 hours
        instance.last_income_calculation = timezone.now() + timedelta(hours=24)
        instance.save()
