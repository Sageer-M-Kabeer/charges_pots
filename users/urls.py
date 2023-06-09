from django.urls import path

from users.admin import WithdrawalRequestAdmin,DepositRequestAdmin
from . import views
from rest_framework import permissions
from django.contrib import admin
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static
from .views import (UserListAPIView,UserBalanceView, UserDetailAPIView, UserLoginAPIView,
                     UserLogoutAPIView, UserSignupAPIView,DepositView, WithdrawView, WithdrawalHistoryView
                    ,DepositHistoryView,DepositRequest,WithdrawalRequestView,DepositRequestView)

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

# from .admin import WithdrawalRequestAdmin, DepositRequestAdmin
# from .custom_admin import custom_admin_site
# # Register your models with the custom admin site
# custom_admin_site.register(WithdrawalRequest, WithdrawalRequestAdmin)
# custom_admin_site.register(DepositRequest, DepositRequestAdmin)


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
    # path('media/deposit_proofs/<>', DepositRequest.as_view(), name='deposit-image'),
    path('withdrawal/request/', WithdrawalRequestView.as_view(), name='withdrawal-request'),
    path('deposit/request/', DepositRequestView.as_view(), name='withdrawal-request'),

     # ...
    path('admin/', admin.site.urls),
    path('deposit/request/<path:object_id>/approve/', DepositRequestAdmin.approve_deposit,name='approve_deposit'),
    path('deposit/request/<path:object_id>/reject/', DepositRequestAdmin.reject_deposit,name='reject_deposit'),
    path('deposit/request/<path:object_id>/delete/', DepositRequestAdmin.delete_deposit,name='delete_deposit'),
    path('withdrawal/request/<path:object_id>/approve/', WithdrawalRequestAdmin.approve_withdrawal, name='approve_withdrawal'),
    path('withdrawal/request/<path:object_id>/reject/', WithdrawalRequestAdmin.reject_withdrawal, name='reject_withdrawal'),
    # path('deposit-request', views.index, name='depositrequests'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


    
    
