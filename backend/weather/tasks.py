from celery import shared_task
import requests
from .models import Alerte

@shared_task
def fetch_and_generate_alerts():
    # Logique pour interroger l’API, analyser et créer des alertes
    from weather.management.commands.verifier_alertes import Command
    try:
        cmd = Command()
        cmd.handle()
    except Exception as e:
        import traceback
        print("[⛔] Erreur dans la tâche Celery :", e)
        traceback.print_exc()


