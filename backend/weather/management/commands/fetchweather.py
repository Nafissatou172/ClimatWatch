import requests
from django.core.management.base import BaseCommand
from ....weather.models import WeatherRecord, Ville
import os
from dotenv import load_dotenv

load_dotenv()


class Command(BaseCommand):
    help = "Récupère les données météo depuis OpenWeatherMap"

    def handle(self, *args, **kwargs):
        API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")
        villes = Ville.objects.all()
        url = "https://api.openweathermap.org/data/2.5/weather"

        for ville in villes:
            params = {
                'q': ville.nom,
                'appid': API_KEY,
                'units': 'metric',
                'lang': 'fr'
            }
            response = requests.get(url, params=params)

            if response.status_code == 200:
                data = response.json()
                temp = data["main"]["temp"]

                record = WeatherRecord.objects.create(
                    ville=ville,
                    temperature=temp,
                    humidity=data["main"]["humidity"],
                    wind_speed=data["wind"]["speed"],
                    latitude=data["coord"]["lat"],
                    longitude=data["coord"]["lon"]
                )

                if temp >= 25.0:
                    alert_level = "moderate"
                    if temp >= 35.0:
                        alert_level = "extreme"
                    elif temp >= 30.0:
                        alert_level = "severe"

                    self.stdout.write(self.style.WARNING(
                        f"⚠️ Alerte {alert_level.upper()} à {ville.nom}: {temp}°C"
                    ),

                    self.stdout.write(self.style.SUCCESS(
                        f"✅ {ville.nom} - {temp}°C enregistré"
                    )))
                    else:
                    self.stdout.write(self.style.ERROR(
                        f"❌ Erreur pour {ville.nom}: HTTP {response.status_code}"
                    ))