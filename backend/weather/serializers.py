from rest_framework import serializers
from .models import WeatherRecord, Alerte

class WeatherRecordSerializer(serializers.ModelSerializer):
    ville = serializers.StringRelatedField()  # pour afficher le nom de la ville

    class Meta:
        model = WeatherRecord
        fields = '__all__'

# serializers.py
class AlerteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alerte
        fields = '__all__'
