from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta, timezone
import random

arr= [{
            "Equipment": "Equipment1",
            "Status": "inactive",
            "Dirty_Filter_Alarm": "Normal",
            "Fan_Speed": str(random.randrange(30,50)) + "%",
            "SA_Temperature": str(random.randrange(30,50)) + "°C",
            "Last_Updated":   '{:%Y-%m-%d %H:%M:%S}'.format(datetime.now(timezone.utc))
        }]

@method_decorator(ensure_csrf_cookie, name='dispatch')
class TriggerAlarmView(APIView):   

    permission_classes = [AllowAny]
    def post(self, request):
        
        status = request.data.get('status', 'inactive')        
        
        arr.append({
            "Equipment": "Equipment" + str(random.randrange(1,3)),
            "Status": status,
            "Dirty_Filter_Alarm": "Normal",
            "Fan_Speed": str(random.randrange(30,50)) + "%",
            "SA_Temperature": str(random.randrange(30,50)) + "°C",
            "Last_Updated":   '{:%Y-%m-%d %H:%M:%S}'.format(datetime.now(timezone.utc))
        })

        chart_arr = [
            {"name": "inactive", "value": 0, "color": '#D1D1D1'},  
            {"name": "active", "value": 0, "color": '#6B92C9'},    
            {"name": "faulty", "value": 0, "color": '#FF6E4C'}     
        ]

        for i in range(0, len(arr)):
            for j in range(0, len(chart_arr)):
                if arr[i]["Status"]== chart_arr[j]["name"]:
                    chart_arr[j]["value"] += 1

        return Response({"alarms": arr, "chart_data": chart_arr, "status": status}, status=200)

        # if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        #     return JsonResponse({"alarms": arr, "chart_data": chart_arr, "status": status})


        # return render(request, 'echart_app/echart.html', {"alarms": arr, "chart_data": chart_arr, "status": status})