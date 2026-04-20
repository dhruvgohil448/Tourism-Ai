from rest_framework.routers import DefaultRouter
from .views import TourViewSet, OrderViewSet

tourRouter = DefaultRouter()
tourRouter.register(r'', TourViewSet)

orderRouter = DefaultRouter()
orderRouter.register(r'', OrderViewSet)