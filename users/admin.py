from django.contrib import admin
from .models import Account, User
from .forms import CustomUserChangeForm, UserCreateForm


class CustomUserAdmin(admin.ModelAdmin):
    form = CustomUserChangeForm
    add_form = UserCreateForm
    model = User
    # readonly_fields = ["invite_code"]
    list_display = ("phone_number", "is_staff", "is_active",)
    list_filter = ("phone_number", "is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("phone_number", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2', 'invite_code', 'captcha_code'),
        }),
    )
    search_fields = ("phone_number",)
    ordering = ("phone_number",)


admin.site.register(User,CustomUserAdmin)
admin.site.register(Account)

