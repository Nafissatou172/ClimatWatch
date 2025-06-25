from django.urls import path
from .views import WeatherByCityView, LiveWeatherView

urlpatterns = [
    #Stockent les données en temps réel dans une base
    path('api/weather/<str:ville_nom>/', WeatherByCityView.as_view(), name='weather-by-city'),
    #Permet de récuperer les données en temps réel directement via l'api
    path('api/live-weather/<str:ville_nom>/', LiveWeatherView.as_view(), name='live-weather'),
]
