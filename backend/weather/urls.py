from django.urls import path
from .views import (WeatherByCityView,
                   LiveWeatherView,
                   WeatherAlertsView,
                   CountryWeatherView)

urlpatterns = [
    path('api/weather/<str:ville_nom>/', WeatherByCityView.as_view(), name='weather-by-city'),
    path('api/live-weather/<str:ville_nom>/', LiveWeatherView.as_view(), name='live-weather'),
    path('api/alerts/', WeatherAlertsView.as_view(), name='weather-alerts'),
    path('api/my-country-weather/', CountryWeatherView.as_view(), name='country-weather'),
]