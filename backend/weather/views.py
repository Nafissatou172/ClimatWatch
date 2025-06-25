from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Ville, WeatherRecord
from .serializers import WeatherRecordSerializer
import os, requests
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

current_timestamp = datetime.now().isoformat()

class WeatherByCityView(APIView):
    def get(self, request, ville_nom):
        try:
            ville = Ville.objects.get(nom__iexact=ville_nom)
            records = WeatherRecord.objects.filter(ville=ville).order_by('-timestamp')[:10]  # dernier 10 enregistrements
            serializer = WeatherRecordSerializer(records, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Ville.DoesNotExist:
            return Response({'error': 'Ville non trouvée'}, status=status.HTTP_404_NOT_FOUND)

class LiveWeatherView(APIView):
    def get(self, request, ville_nom):
        api_key = os.getenv('OPENWEATHERMAP_API_KEY')
        url = "https://api.openweathermap.org/data/2.5/weather"
        params = {
            "q": ville_nom,
            "appid": api_key,
            #"units": "metric",
        }

        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            return Response({
                "ville": ville_nom,
                "temperature": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"],
                "latitude": data["coord"]["lat"],
                "longitude": data["coord"]["lon"],
                "description": data["weather"][0]["description"],
                "icon": data["weather"][0]["icon"],
                "timestamps": current_timestamp
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": f"Impossible de récupérer les données météo pour {ville_nom}"
            }, status=status.HTTP_404_NOT_FOUND)
