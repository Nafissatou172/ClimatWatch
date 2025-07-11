from django.core.management.base import BaseCommand
from weather.models import Alerte
import requests
from django.utils.timezone import now

class Command(BaseCommand):
    help = 'Vérifie les températures et crée des alertes si nécessaire'

    def handle(self, *args, **kwargs):
        villes = [
            "Dakar", "Thies", "Saint-Louis", "Ziguinchor", "Kaolack",
            "Tambacounda", "Kolda", "Louga", "Fatick", "Matam", "Diourbel",
            "Kaffrine", "Kédougou", "Sédhiou"
        ] 
        today = now().date()
        # Désactive les anciennes alertes dont la date n'est pas aujourd'hui
        Alerte.objects.filter(is_active=True).exclude(date_alerte__date=today).update(is_active=False)
        print(f"[ℹ] Anciennes alertes désactivées")

        for ville in villes:
            try:
                response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={ville},sn&APPID=e861dd8f84bf90620f941b3aa411a12f")
                data = response.json()
                kelvin = data["main"]["temp"]
                temp = round(kelvin - 273.15, 2)  # Conversion Kelvin → Celsius

                if temp is None:
                    continue
                if temp >= 40:
                    niveau = "tres_dangereux"
                    message = f"Canicule : Température extrême ({temp}°C) à {ville} ! Danger de mort."
                elif temp >= 35:
                    niveau = "dangereux"
                    message = f"Chaleur intense à {ville} ({temp}°C). Prenez des précautions."
                elif temp >= 27:
                    niveau = "inconfortable"
                    message = f"Température élevée à {ville} ({temp}°C). Hydratez-vous bien."
                else:
                    niveau = "normal"
                    message = f"Température normale à {ville} ({temp}°C). Pensez quand meme a boire de l'eau"

                # Vérifie la dernière alerte pour la ville
                last_alert = Alerte.objects.filter(region=ville).order_by('-date_alerte').first()

                if not last_alert or last_alert.niveau != niveau:
                    Alerte.objects.create(
                        region=ville,
                        temp=temp,
                        niveau=niveau,
                        description=message,
                        is_active=True
                    )
                    print(f"[✔] Alerte créée pour {ville} : {niveau} ({temp}°C)")
                else:
                    print(f"[ℹ] Pas de nouveau niveau d'alerte pour {ville} ({temp}°C)")

            except Exception as e:
                self.stderr.write(f"Erreur pour {ville} : {e}") 
