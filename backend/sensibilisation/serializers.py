from rest_framework import serializers
from .models import Sensibilisation

class SensibilisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensibilisation
        fields = '__all__'
