from rest_framework import serializers
from .models import WeatherRecord

class WeatherRecordSerializer(serializers.ModelSerializer):
    ville = serializers.StringRelatedField()  # pour afficher le nom de la ville

    class Meta:
        model = WeatherRecord
        fields = '__all__'
