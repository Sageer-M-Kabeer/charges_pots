from rest_framework import serializers
from .models import Vip,VipLevel
from users.models import User

class VipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vip
        fields = '__all__'
        read_only_fields = ('name','user', 'level', 'price', 'daily_income', 'total_revenue', 'circle_days')


class BuyVipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vip
        fields = ['level']

class UserVipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vip
        fields = ['level', 'price', 'daily_income', 'total_revenue', 'circle_days']


class ResetVipSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    def validate_user(self, value):
        # Check if the user exists
        if not User.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Invalid user")

        return value


