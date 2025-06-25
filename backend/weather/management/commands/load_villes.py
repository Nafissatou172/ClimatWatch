from django.core.management.base import BaseCommand
from weather.models import Ville

class Command(BaseCommand):
    help = "Charge les villes du Sénégal dans la base"

    def handle(self, *args, **kwargs):
        villes = [
            "Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack",
            "Tambacounda", "Kolda", "Louga", "Fatick", "Matam", "Diourbel",
            "Kaffrine", "Kédougou", "Sédhiou"
        ]
        for nom in villes:
            Ville.objects.get_or_create(nom=nom)
        self.stdout.write(self.style.SUCCESS("✅ Villes chargées avec succès."))
