from django.contrib import admin
from .models import Account, User,Transaction,BankDetails,ReferralTeam
from .forms import CustomUserChangeForm, UserCreateForm


class CustomUserAdmin(admin.ModelAdmin):
    form = CustomUserChangeForm
    add_form = UserCreateForm
    model = User
    # readonly_fields = ["invite_code"]
    list_display = ("phone_number", "is_staff", "is_active","invite_code",)
    list_filter = ("phone_number", "is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("phone_number", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2', 'invite_code',),
        }),
    )
    search_fields = ("phone_number",)
    ordering = ("phone_number",)

class AccountAdmin(admin.ModelAdmin):
    model=Account
    list_display = ('user','balance')
    readonly_fields = ('user', 'balance')
    list_filter = ('user',)

class TransactionInline(admin.TabularInline):
    model = Transaction
    extra = 0
    readonly_fields = ('user', 'amount', 'transaction_type', 'timestamp')
    can_delete = False

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user','transaction_type','amount','timestamp')
    search_fields = ('phone_number',)
    list_filter = ('transaction_type',)

class BankDetailsAdmin(admin.ModelAdmin):
    list_display = ("user", "account_name","account_number","bank_name")
    search_fields =  ('phone_number',)

class TeamAdmin(admin.ModelAdmin):
    list_display = ("user","numbers_of_invites","team_recharge","comissions")
    readonly_fields = ("numbers_of_invites","team_recharge","comissions" )
    search_fields = ("phone_number",)




admin.site.register(User,CustomUserAdmin)
admin.site.register(Account,AccountAdmin)
admin.site.register(Transaction,TransactionAdmin)
admin.site.register(BankDetails,BankDetailsAdmin)
admin.site.register(ReferralTeam,TeamAdmin)


