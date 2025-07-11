from django.db import models

# Create your models here.


class Ville(models.Model):
    nom = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nom
    # def get_ville_inconnue():
    #     return Ville.objects.get_or_create(nom="Ville_inconnue")[0].id


class WeatherRecord(models.Model):
    ville = models.ForeignKey(Ville, on_delete=models.CASCADE, related_name='records',null=True)
    temperature = models.FloatField()
    humidity = models.FloatField()
    wind_speed = models.FloatField()
    uv_index = models.FloatField(null=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ville.nom} - {self.timestamp.strftime('%Y-%m-%d %H:%M')} - Temp: {self.temperature}°C"


class Alerte(models.Model):
    NIVEAU_CHOICES = [
        ('normal', 'Normal'),
        ('inconfortable', 'Inconfortable'),
        ('dangereux', 'Dangereux'),
        ('tres_dangereux', 'Très Dangereux'),
    ]

    region = models.CharField(max_length=100)
    niveau = models.CharField(max_length=20, choices=NIVEAU_CHOICES)
    description = models.TextField()
    date_alerte = models.DateTimeField(auto_now_add=True)
    temp = models.FloatField(null=True)
    is_active = models.BooleanField(default=True)  # ✅ Nouveau champ

    def __str__(self):
        return f"{self.region} - {self.niveau}"


