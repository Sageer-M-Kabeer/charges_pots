from django.urls import path
from .views import BuyVipView,ResetVipView


urlpatterns = [
    path('buy-vip/', BuyVipView.as_view(), name='buy-vip'),
    path('reset-vip/', ResetVipView.as_view(), name='reset-vip'),
]
