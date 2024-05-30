from django.shortcuts import render

# Create your views here.
def weather(request, weather_type):
    weather_mapping = {
        'Sun': ('Sunny', 'sun-sunny-svgrepo-com.svg'),
        'Cloud': ('Cloudy', 'weather-color-sun-cloud-svgrepo-com.svg'),
        'Rain': ('Rainy', 'rain-svgrepo-com.svg'),
    }

    title, image = weather_mapping.get(weather_type, ('Unknown', 'sun-sunny-svgrepo-com.svg'))

    context = {
        'title': title,
        'image': image,
        'temperature': '15.2°C',  
    }

    return render(request, 'weatherapp/Score_card.html', context)