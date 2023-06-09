from django.contrib import admin
from .models import (Account, User,Transaction,BankDetails,
                     ReferralTeam,WithdrawalRequest,DepositTransactionRequest)
from .forms import CustomUserChangeForm, UserCreateForm
from django.urls import path
from django.shortcuts import render, redirect


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



class WithdrawalRequestAdmin(admin.ModelAdmin):
    change_form_template = 'admin/withdrawal_action.html'
    list_display = ('user', 'amount', 'status')
    readonly_fields = ('user', 'amount', 'status')

    def approve_withdrawal(self, request, object_id):
        withdrawal_request = WithdrawalRequest.objects.get(pk=1)
        if withdrawal_request:
            if withdrawal_request.status == 'pending':
                withdrawal_request.status = 'successful'
                withdrawal_request.save()

                withdrawal_request.user.account.balance -= withdrawal_request.amount
                withdrawal_request.user.account.save()

                self.message_user(request, 'Withdrawal request approved successfully.')
            else:
                self.message_user(request, 'Withdrawal request has already been approved or rejected.')
        return redirect('admin:users_withdrawalrequest_changelist')

    def reject_withdrawal(self, request, object_id):
        withdrawal_request = self.get_object(request, object_id)
        if withdrawal_request:
            if withdrawal_request.status == 'pending':
                withdrawal_request.status = 'failed'
                withdrawal_request.save()

                self.message_user(request, 'Withdrawal request rejected successfully.')
            else:
                self.message_user(request, 'Withdrawal request has already been approved or rejected.')
        return redirect('admin:users_withdrawalrequest_changelist')

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<path:object_id>/approve/', self.admin_site.admin_view(self.approve_withdrawal),
                 name='approve_withdrawal'),
            path('<path:object_id>/reject/', self.admin_site.admin_view(self.reject_withdrawal),
                 name='reject_withdrawal'),
        ]
        return custom_urls + urls

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        withdrawal_request = WithdrawalRequest.objects.get(id=object_id)
        extra_context['object_id'] = object_id
        # extra_context['user_bankdetails'] = withdrawal_request.user.bank_details
        return super().change_view(request, object_id, form_url=form_url, extra_context=extra_context)

class DepositRequestAdmin(admin.ModelAdmin):
    class Meta:
        model = WithdrawalRequest
    list_display = ["user","status","is_aproved","proof","narration"]


admin.site.register(User,CustomUserAdmin)
admin.site.register(Account,AccountAdmin)
admin.site.register(Transaction,TransactionAdmin)
admin.site.register(BankDetails,BankDetailsAdmin)
admin.site.register(ReferralTeam,TeamAdmin)
admin.site.register(WithdrawalRequest,WithdrawalRequestAdmin)
admin.site.register(DepositTransactionRequest,DepositRequestAdmin)


