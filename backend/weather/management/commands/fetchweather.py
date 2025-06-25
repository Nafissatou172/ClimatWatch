# weather/management/commands/fetchweather.py

import requests
from django.core.management.base import BaseCommand
from weather.models import WeatherRecord, Ville
import os
from dotenv import load_dotenv

load_dotenv()  # Charge automatiquement le fichier .env

#API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")


class Command(BaseCommand):
    help = "Récupère les données météo depuis OpenWeatherMap"

    def handle(self, *args, **kwargs):
        API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")  # remplace par ta vraie clé
        villes = Ville.objects.all()
        url = "https://api.openweathermap.org/data/2.5/weather"

        for ville in villes:
            params = {
                'q': ville.nom,
                'appid': API_KEY,
                #'units': 'metric',
            }
            response = requests.get(url, params=params)

            if response.status_code == 200:
                data = response.json()
                WeatherRecord.objects.create(
                    ville=ville,
                    temperature=data["main"]["temp"],
                    humidity=data["main"]["humidity"],
                    wind_speed=data["wind"]["speed"],
                    uv_index=None,
                    latitude=data["coord"]["lat"],
                    longitude=data["coord"]["lon"]
                )
                self.stdout.write(self.style.SUCCESS(f"✅ {ville.nom} - Données enregistrées"))
            else:
                self.stdout.write(self.style.ERROR(f"❌ {ville.nom} - Erreur {response.status_code}"))