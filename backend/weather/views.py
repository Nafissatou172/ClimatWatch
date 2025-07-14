from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Ville, WeatherRecord
from .serializers import WeatherRecordSerializer
import os
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

current_timestamp = datetime.now().isoformat()


class WeatherByCityView(APIView):
    def get(self, request, ville_nom):
        try:
            ville = Ville.objects.get(nom__iexact=ville_nom)
            records = WeatherRecord.objects.filter(ville=ville).order_by('-timestamp')[:10]
            serializer = WeatherRecordSerializer(records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Ville.DoesNotExist:
            return Response({'error': 'Ville non trouvée'}, status=status.HTTP_404_NOT_FOUND)


class LiveWeatherView(APIView):
    def get(self, request, ville_nom):
        api_key = os.getenv('OPENWEATHERMAP_API_KEY')
        if not api_key:
            return Response({'error': 'Configuration API manquante'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        url = "https://api.openweathermap.org/data/2.5/weather"
        params = {
            "q": ville_nom,
            "appid": api_key,
            "units": "metric",
            "lang": "fr"
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            temp = data["main"]["temp"]
            alert = self._get_alert_data(temp, ville_nom)

            response_data = {
                "ville": ville_nom,
                "temperature": temp,
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"],
                "latitude": data["coord"]["lat"],
                "longitude": data["coord"]["lon"],
                "description": data["weather"][0]["description"],
                "icon": data["weather"][0]["icon"],
                "timestamp": current_timestamp,
                "alert": alert
            }
            return Response(response_data, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            return Response({
                "error": f"Erreur API: {str(e)}",
                "details": f"Impossible de récupérer les données pour {ville_nom}"
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)

    def _get_alert_data(self, temperature, location):
        if temperature >= 35.0:
            return {
                "has_alert": True,
                "message": f"DANGER: Chaleur extrême ({temperature}°C) à {location}",
                "type": "temperature",
                "level": "extreme"
            }
        elif temperature >= 30.0:
            return {
                "has_alert": True,
                "message": f"Alerte: Forte chaleur ({temperature}°C) à {location}",
                "type": "temperature",
                "level": "severe"
            }
        elif temperature >= 25.0:
            return {
                "has_alert": True,
                "message": f"Attention: Conditions chaudes ({temperature}°C) à {location}",
                "type": "temperature",
                "level": "moderate"
            }
        return None


class CountryWeatherView(APIView):
    def get(self, request):
        default_country = "Senegal"
        default_city = "Dakar"

        try:
            country = request.META.get('HTTP_X_COUNTRY', default_country)
            city = request.META.get('HTTP_X_CITY', default_city)

            if os.getenv('DEBUG', 'False') == 'True':
                country = default_country
                city = default_city

            api_key = os.getenv('OPENWEATHERMAP_API_KEY')
            if not api_key:
                return Response({'error': 'Configuration API manquante'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            url = "https://api.openweathermap.org/data/2.5/weather"
            params = {
                "q": city,
                "appid": api_key,
                "units": "metric",
                "lang": "fr"
            }

            response = requests.get(url, params=params)
            if response.status_code == 200:
                data = response.json()
                temp = data["main"]["temp"]
                alert = LiveWeatherView()._get_alert_data(temp, city)

                return Response({
                    "pays": country,
                    "ville": city,
                    "temperature": temp,
                    "humidity": data["main"]["humidity"],
                    "wind_speed": data["wind"]["speed"],
                    "description": data["weather"][0]["description"],
                    "icon": data["weather"][0]["icon"],
                    "timestamp": current_timestamp,
                    "alert": alert
                })
            else:
                return Response({
                    "error": f"Impossible de récupérer les données pour {city}",
                    "status_code": response.status_code
                }, status=status.HTTP_502_BAD_GATEWAY)

        except Exception as e:
            return Response({
                "error": str(e),
                "default_data": {
                    "pays": default_country,
                    "ville": default_city,
                    "message": "Utilisation des données par défaut"
                }
            }, status=status.HTTP_200_OK)


class WeatherAlertsView(APIView):
    def get(self, request):
        try:
            # Récupère les alertes avec seuil à 25°C
            alert_records = WeatherRecord.objects.filter(temperature__gte=25.0) \
                .order_by('-timestamp')

            # Filtre supplémentaire optionnel pour les tests
            min_temp = request.query_params.get('min_temp')
            if min_temp:
                alert_records = alert_records.filter(temperature__gte=float(min_temp))

            serializer = WeatherRecordSerializer(alert_records, many=True)
            return Response({
                "count": alert_records.count(),
                "threshold": 25.0,
                "results": serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                "error": f"Erreur de traitement: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)