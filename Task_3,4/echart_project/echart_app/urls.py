from django.urls import path
from .views import TriggerAlarmView

urlpatterns = [
    path('triggeralarm/', TriggerAlarmView.as_view(), name='trigger_alarm'),
]