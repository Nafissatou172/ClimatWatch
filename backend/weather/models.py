from django.db import models

class Ville(models.Model):
    nom = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nom

class WeatherRecord(models.Model):
    ville = models.ForeignKey(Ville, on_delete=models.CASCADE, related_name='records', null=True)
    temperature = models.FloatField()
    humidity = models.FloatField()
    wind_speed = models.FloatField()
    uv_index = models.FloatField(null=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    @property
    def temperature_alert_level(self):
        if self.temperature >= 35.0:
            return "extreme"
        elif self.temperature >= 30.0:
            return "severe"
        elif self.temperature >= 25.0:
            return "moderate"
        return None

    def get_alert_message(self):
        level = self.temperature_alert_level
        if level == "extreme":
            return f"DANGER: Chaleur extrême ({self.temperature}°C) à {self.ville.nom}"
        elif level == "severe":
            return f"Alerte: Forte chaleur ({self.temperature}°C) à {self.ville.nom}"
        elif level == "moderate":
            return f"Attention: Conditions chaudes ({self.temperature}°C) à {self.ville.nom}"
        return None

    def __str__(self):
        return f"{self.ville.nom} - {self.timestamp.strftime('%Y-%m-%d %H:%M')} - Temp: {self.temperature}°C"