from rest_framework.routers import DefaultRouter
from .views import FetchAIViewSet

fetchaiRouter = DefaultRouter()
fetchaiRouter.register(r'', FetchAIViewSet)