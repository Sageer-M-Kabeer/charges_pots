from django.urls import path
from . import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import UserListAPIView, UserDetailAPIView, UserLoginAPIView, UserLogoutAPIView, UserSignupAPIView

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
    path('users/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
    path('logout/', UserLogoutAPIView.as_view(), name='user-logout'), 
    path('signup/', UserSignupAPIView.as_view(), name='user-signup'),
    
    # path('hello', views.index, name='index'),
]
    
    