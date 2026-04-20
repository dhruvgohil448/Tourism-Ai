from rest_framework import serializers
from .models import ItineraryPlanner

class ItineraryPlannerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ItineraryPlanner
        fields = '__all__'