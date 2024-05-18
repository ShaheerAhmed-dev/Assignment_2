from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse


# Create your views here.
def trigger_alarm(request):
    
    if request.method == 'POST':
        status = request.POST.get('status')
    else:
        status = request.GET.get('status', 'inactive') 

    arr= [{
        "Equipment": "Equipment1",
        "Status": "inactive",
        "Dirty_Filter_Alarm": "Normal",
        "Fan_Speed": "36 %",
        "SA_Temperature": "22°C",
        "Last_Updated": "2023-05-18 10:00 AM"
    },
    {
        "Equipment": "Equipment2",
        "Status": "active",
        "Dirty_Filter_Alarm": "Normal",
        "Fan_Speed": "36 %",
        "SA_Temperature": "22°C",
        "Last_Updated": "2023-05-18 10:00 AM"
    }]

    if status =='faulty':
        arr.append({
            "Equipment": "Equipment3",
            "Status": "faulty",
            "Dirty_Filter_Alarm": "Normal",
            "Fan_Speed": "36 %",
            "SA_Temperature": "22°C",
            "Last_Updated": "2023-05-18 10:00 AM"
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


    return render(request, 'echart_app/echart.html', {"alarms": arr, "chart_data": chart_arr, "status": status})