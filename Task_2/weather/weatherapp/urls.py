from django.urls import path
from .views import weather

urlpatterns = [
    path('weather/<str:weather_type>', weather, name='weather'),
]