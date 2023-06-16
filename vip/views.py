from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Vip, VipLevel
from .serializers import VipSerializer, BuyVipSerializer,ResetVipSerializer,UserVipSerializer
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from users.models import User
from django.core.exceptions import ObjectDoesNotExist



class VipView(generics.RetrieveAPIView):
    serializer_class = VipSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        try:
            vip = user.vip
        except Vip.DoesNotExist:
            vip = None
        return vip

class BuyVipView(generics.CreateAPIView):
    serializer_class = BuyVipSerializer

    def get_queryset(self):
        return Vip.objects.none()

    def perform_create(self, serializer):
        vip_level = serializer.validated_data['level']
        user = self.request.user
        if user.account.balance < vip_level.price:
            raise ValidationError("Insufficient balance to purchase VIP.")
        user.account.balance -= vip_level.price
        user.account.save()
        vip = Vip.objects.create(level=vip_level)
        vip.save()


class UserVipView(generics.RetrieveAPIView):
    serializer_class = UserVipSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return Vip.objects.get(user=user)


@method_decorator(staff_member_required, name='dispatch')
class ResetVipView(generics.GenericAPIView):
    serializer_class = ResetVipSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        try:
            vip = Vip.objects.get(user=user)
            vip.reset_vip()
        except ObjectDoesNotExist:
            return Response({'message': 'Vip object does not exist for the user'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'message': 'VIP level reset successful'}, status=status.HTTP_200_OK)
