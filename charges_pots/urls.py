from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
     path('vip/', include('vip.urls')),
    # path('deposit-request', index, name='depositrequests'),
    # path('', include('accounts.urls', namespace='accounts'))
]

