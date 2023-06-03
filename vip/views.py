from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Vip
from .serializers import VipSerializer, BuyVipSerializer,ResetVipSerializer,UserVipSerializer
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from users.models import User



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
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        level = serializer.validated_data['level']
        user = request.user

        try:
            vip = user.vip
            return Response({'error': 'You already have an active VIP subscription'}, status=status.HTTP_400_BAD_REQUEST)
        except Vip.DoesNotExist:
            # Check if user has sufficient balance to purchase the VIP level
            # Adjust the condition according to your business logic
            if user.account.balance >= level * 100:  # Assuming the price is calculated based on the level

                # Deduct the price from user's account balance
                user.account.balance -= level * 100
                user.account.save()

                # Create a new VIP subscription
                vip = Vip.objects.create(user=user, level=level, price=level * 100)
                vip.start_daily_income()

                serializer = VipSerializer(vip)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response({'error': 'Insufficient balance to purchase the VIP level'}, status=status.HTTP_400_BAD_REQUEST)

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
        user_id = serializer.validated_data['user_id']
        user = get_object_or_404(User, id=user_id)

        # Reset the VIP level for the user
        vip = Vip.objects.get(user=user)
        vip.reset_vip()

        return Response({'message': 'VIP level reset successful'}, status=status.HTTP_200_OK)