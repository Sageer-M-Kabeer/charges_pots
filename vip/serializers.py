from rest_framework import serializers
from .models import Vip

class VipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vip
        fields = '__all__'
        read_only_fields = ('user', 'level', 'price', 'daily_income', 'total_revenue', 'circle_days')


class BuyVipSerializer(serializers.Serializer):
    level = serializers.IntegerField()

class UserVipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vip
        fields = ['level', 'price', 'daily_income', 'total_revenue', 'circle_days']


class ResetVipSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()

    def validate_user_id(self, value):
        # Check if the user exists
        user = User.objects.filter(id=value).first()
        if not user:
            raise serializers.ValidationError("Invalid user ID")
        return value

