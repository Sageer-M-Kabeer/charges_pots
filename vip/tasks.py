from celery import shared_task
from django.utils import timezone
from datetime import timedelta  # Import timedelta from datetime module
from .models import Vip

@shared_task
def update_total_revenue():
    # Get all active VIPs
    active_vips = Vip.objects.filter(circle_days__gte=timezone.now())

    for vip in active_vips:
        # Calculate the revenue increase for one day
        daily_income = float(vip.daily_income)
        revenue_increase = daily_income * timedelta(days=1).total_seconds()

        # Update the total revenue for the VIP
        vip.total_revenue += revenue_increase
        vip.save()
