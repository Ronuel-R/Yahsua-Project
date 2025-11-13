from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskView

# Create a router and register our viewset
router = DefaultRouter()
router.register(r'tasks', TaskView, basename='task')

urlpatterns = [
    path('', include(router.urls)),
]