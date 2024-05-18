from django.urls import path
from .views import trigger_alarm

urlpatterns = [
    path('triggeralarm/', trigger_alarm, name='trigger_alarm'),
]