from django.urls import path
from .views import WeatherByCityView, LiveWeatherView, AlerteListAPIView, TemperatureStatsAPIView

urlpatterns = [
    #Stockent les données en temps réel dans une base
    path('api/weather/<str:ville_nom>/', WeatherByCityView.as_view(), name='weather-by-city'),
    #Permet de récuperer les données en temps réel directement via l'api
    path('api/live-weather/<str:ville_nom>/', LiveWeatherView.as_view(), name='live-weather'),
    path('api/alertes/', AlerteListAPIView.as_view(), name='liste-alertes'),
    path('api/temperature_stats/', TemperatureStatsAPIView.as_view(), name='temperature-moyenne'),
]

