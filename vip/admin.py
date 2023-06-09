from django.contrib import admin
from .models import Vip,VipLevel
# from users.models import User

class VipLevelAdmin(admin.ModelAdmin):
    list_display = ['level', 'price', 'daily_income', 'total_revenue','circle_days','is_expired']

class VipAdmin(admin.ModelAdmin):
    list_display = ['user', 'level',]
    actions = ['reset_vip']

    def reset_vip(self, request, queryset):
        for vip in queryset:
            vip.user.vip.reset_vip()
        self.message_user(request, 'VIP level reset successful')

    reset_vip.short_description = 'Reset VIP Level'

admin.site.register(VipLevel, VipLevelAdmin)
admin.site.register(Vip, VipAdmin)

