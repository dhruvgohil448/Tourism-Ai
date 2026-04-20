"""
URL configuration for TourAPI project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.http import HttpResponse

from .settings import DEBUG, MEDIA_ROOT, MEDIA_URL
from tour.urls import tourRouter, orderRouter
from fetchai.urls import fetchaiRouter

urlpatterns = [
    path('', lambda request: HttpResponse("Trip AI API - Available endpoints: /tours, /orders, /fetchai, /admin")),
    path('admin/', admin.site.urls),

    path('tours/', include(tourRouter.urls)),
    path('orders/', include(orderRouter.urls)),
    path('fetchai/', include(fetchaiRouter.urls)),
]

if DEBUG:
    urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)