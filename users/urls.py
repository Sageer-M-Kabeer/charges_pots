from django.urls import path

from users.admin import WithdrawalRequestAdmin
from . import views
from rest_framework import permissions
from django.contrib import admin
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import (UserListAPIView,UserBalanceView, UserDetailAPIView, UserLoginAPIView,
                     UserLogoutAPIView, UserSignupAPIView,DepositView, WithdrawView, WithdrawalHistoryView
                    ,DepositHistoryView,DepositRequest,WithdrawalRequestView)

schema_view = get_schema_view(
    openapi.Info(
        title='Charges-pots network api',
        default_version='v1',
        description='test desc',
        terms_of_service='https://www.google.com/policies/terms/',
        contact = openapi.Contact(email='dummy@my.api'),
        license=openapi.License(name='BSD License'),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
) 

app_name = 'users'
urlpatterns = [
    path('', schema_view.with_ui('swagger',cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',cache_timeout=0), name='schema-redoc'),
    path('users/', UserListAPIView.as_view(), name='user-list'),
    path('users/<slug>/', UserDetailAPIView.as_view(), name='user-detail'),
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
    path('logout/', UserLogoutAPIView.as_view(), name='user-logout'), 
    path('signup/', UserSignupAPIView.as_view(), name='user-signup'),
    path('deposit/', DepositView.as_view(), name='deposit'),
    path('withdraw/<slug>/', WithdrawView.as_view(), name='withdraw'),
    path('balance/', UserBalanceView.as_view(), name='balance'),
    path('withdrawhistory/', WithdrawalHistoryView.as_view(), name='withdrawtransaction'),
    path('deposithistory/', DepositHistoryView.as_view(), name='deposithistory'),
    path('media/deposit_proofs/<>', DepositRequest.as_view(), name='deposit-image'),
    path('withdrawal/request/', WithdrawalRequestView.as_view(), name='withdrawal-request'),
     # ...
    path('admin/', admin.site.urls),
    path('withdrawal/request/<path:object_id>/approve/', WithdrawalRequestAdmin.approve_withdrawal, name='approve_withdrawal'),
    path('withdrawal/request/<path:object_id>/reject/', WithdrawalRequestAdmin.reject_withdrawal, name='reject_withdrawal'),
    # path('deposit-request', views.index, name='depositrequests'),


]
    
    
