from rest_framework import serializers
from .models import WeatherRecord

class WeatherRecordSerializer(serializers.ModelSerializer):
    ville = serializers.StringRelatedField()
    alert = serializers.SerializerMethodField()

    class Meta:
        model = WeatherRecord
        fields = '__all__'

    def get_alert(self, obj):
        if obj.temperature_alert_level:
            return {
                'has_alert': True,
                'message': obj.get_alert_message(),
                'type': 'temperature',
                'level': obj.temperature_alert_level,
                'threshold': 25.0  # Seuil de base
            }
        return None