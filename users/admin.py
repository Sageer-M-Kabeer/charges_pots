from decimal import Decimal
from django.contrib import admin
from .models import (Account, User,Transaction,BankDetails,
                     ReferralTeam,WithdrawalRequest,DepositRequest)
# from .forms import CustomUserChangeForm, UserCreateForm
from django.urls import path
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.utils.html import format_html


class CustomUserAdmin(admin.ModelAdmin):
    model = User
    list_display = ("phone_number", "code", "is_staff", "is_active")
    list_filter = ("phone_number", "is_staff", "is_active")
    fieldsets = (
        (None, {"fields": ("phone_number", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone_number', 'password1', 'password2')
        }),
    )
    search_fields = ("phone_number",)
    ordering = ("phone_number",)

    def code(self, obj):
        return obj.profile.code

    @admin.action(description="Ban selected users")
    def ban_users(self, request, queryset):
        # Update the selected users to be inactive
        queryset.update(is_active=False)
    
    @admin.action(description="Unban selected users")
    def un_ban_users(self, request, queryset):
        # Update the selected users to be inactive
        queryset.update(is_active=True)

    actions = [ban_users,un_ban_users]


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
    list_display = ('user','transaction_type','amount','timestamp','status')
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
    list_display = ('user', 'amount', 'status_withdrawal',"bank_details", 'withdrawal_actions')
    readonly_fields = ('user', 'amount', 'status')

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<path:object_id>/approve/', self.admin_site.admin_view(self.approve_withdrawal),
                 name='approve_withdrawal'),
            path('<path:object_id>/reject/', self.admin_site.admin_view(self.reject_withdrawal),
                 name='reject_withdrawal'),
            path('<path:object_id>/delete/', self.admin_site.admin_view(self.delete_withdrawal),
                 name='delete_withdrawal'),
        ]
        return custom_urls + urls

    def approve_withdrawal(self, request, object_id):
        withdrawal_request = self.get_object(request, object_id)
        if withdrawal_request:
            if withdrawal_request.status == 'pending':
                withdrawal_request.status = 'successful'
                withdrawal_request.save()

                account = withdrawal_request.user.account
                withdrawal_amount = withdrawal_request.amount

                if withdrawal_amount <= account.balance:
                    account.balance -= withdrawal_amount
                else:
                    withdrawal_amount = account.balance
                    account.balance = 0
                account.save()

                # Deduct service fee (10%) from the withdrawal amount
                service_fee = withdrawal_amount * Decimal(0.1)
                withdrawal_amount -= service_fee

                # Create a transaction for the approved withdrawal
                Transaction.objects.create(
                    user=withdrawal_request.user,
                    amount=withdrawal_amount,
                    transaction_type='withdrawal',
                    status='successful'
                )

                self.message_user(request, 'Withdrawal request approved successfully.')
            else:
                self.message_user(request, 'Withdrawal request has already been approved or rejected.')
        return HttpResponseRedirect(reverse('admin:users_withdrawalrequest_changelist'))


    def reject_withdrawal(self, request, object_id):
        withdrawal_request = self.get_object(request, object_id)
        if withdrawal_request:
            if withdrawal_request.status == 'pending':
                withdrawal_request.status = 'failed'
                withdrawal_request.save()

                self.message_user(request, 'Withdrawal request rejected successfully.')
            else:
                self.message_user(request, 'Withdrawal request has already been approved or rejected.')
        return HttpResponseRedirect(reverse('admin:users_withdrawalrequest_changelist'))

    def delete_withdrawal(self, request, object_id):
        withdrawal_request = self.get_object(request, object_id)
        if withdrawal_request:
            withdrawal_request.delete()
            self.message_user(request, 'Withdrawal request deleted successfully.')
        return HttpResponseRedirect(reverse('admin:users_withdrawalrequest_changelist'))

    def withdrawal_actions(self, obj):
        return format_html(
            '<a class="button" href="{}">Approve</a>&nbsp;'
            '<a class="button" href="{}">Reject</a>&nbsp;'
            '<a class="button" href="{}">Delete</a>',
            reverse('admin:approve_withdrawal', args=[obj.pk]),
            reverse('admin:reject_withdrawal', args=[obj.pk]),
            reverse('admin:delete_withdrawal', args=[obj.pk])
        )
    withdrawal_actions.short_description = 'Actions'
    withdrawal_actions.allow_tags = True

    def status_withdrawal(self, obj):
        return obj.status
    status_withdrawal.short_description = 'Status'



class DepositRequestAdmin(admin.ModelAdmin):
    change_form_template = 'admin/deposit_action.html'
    list_display = ('user', 'amount', 'status_deposit',"proof",'narration',"timestamp", 'deposit_actions')
    readonly_fields = ('user', 'amount', 'status',"proof","timestamp")
    raw_id_fields = ("user",)
    # search_fields = ("user_user_id",)
    ordering = ('-timestamp',)
    # list_filter = ('user','timestamp','amount')

    def deposit_proof_url(self, obj):
        if obj.proof:
            return format_html('<a href="{}" target="_blank">{}</a>', obj.proof.url, obj.proof.name)
        else:
            return None
    
    deposit_proof_url.short_description = 'Deposit Proof'
    deposit_proof_url.allow_tags = True

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<path:object_id>/approve/', self.admin_site.admin_view(self.approve_deposit),
                 name='approve_deposit'),
            path('<path:object_id>/reject/', self.admin_site.admin_view(self.reject_deposit),
                 name='reject_deposit'),
            path('<path:object_id>/delete/', self.admin_site.admin_view(self.delete_deposit),
                 name='delete_deposit'),
        ]
        return custom_urls + urls

    def approve_deposit(self, request, object_id):
        deposit_request = self.get_object(request, object_id)
        if deposit_request:
            if deposit_request.status == 'pending':
                deposit_request.status = 'successful'
                deposit_request.save()

                account = deposit_request.user.account  # Access the Account object
                account.balance += deposit_request.amount
                account.total_income += deposit_request.amount  # Update total_income
                account.save()

                self.message_user(request, 'Deposit request approved successfully.')
            else:
                self.message_user(request, 'Deposit request has already been approved or rejected.')
        return HttpResponseRedirect(reverse('admin:users_depositrequest_changelist'))

    def reject_deposit(self, request, object_id):
        deposit_request = self.get_object(request, object_id)
        if deposit_request:
            if deposit_request.status == 'pending':
                deposit_request.status = 'failed'
                deposit_request.save()

                self.message_user(request, 'Deposit request rejected successfully.')
            else:
                self.message_user(request, 'Deposit request has already been approved or rejected.')
        return HttpResponseRedirect(reverse('admin:users_depositrequest_changelist'))

    def delete_deposit(self, request, object_id):
        deposit_request = self.get_object(request, object_id)
        if deposit_request:
            deposit_request.delete()
            self.message_user(request, 'Deposit request deleted successfully.')
        return HttpResponseRedirect(reverse('admin:users_depositrequest_changelist'))

    def deposit_actions(self, obj):
        return format_html(
            '<a class="button" href="{}">Approve</a>&nbsp;'
            '<a class="button" href="{}">Reject</a>&nbsp;'
            '<a class="button" href="{}">Delete</a>',
            reverse('admin:approve_deposit', args=[obj.pk]),
            reverse('admin:reject_deposit', args=[obj.pk]),
            reverse('admin:delete_deposit', args=[obj.pk])
        )
    deposit_actions.short_description = 'Actions'
    deposit_actions.allow_tags = True

    def status_deposit(self, obj):
        return obj.status
    status_deposit.short_description = 'Status'


admin.site.register(User,CustomUserAdmin)
admin.site.register(Account,AccountAdmin)
admin.site.register(Transaction,TransactionAdmin)
admin.site.register(BankDetails,BankDetailsAdmin)
admin.site.register(ReferralTeam,TeamAdmin)
admin.site.register(WithdrawalRequest,WithdrawalRequestAdmin)
admin.site.register(DepositRequest, DepositRequestAdmin)
# admin.site.register(Profile)



