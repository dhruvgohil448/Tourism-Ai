import requests, datetime

from twilio.rest import Client
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import ItineraryPlanner
from .constants import GeminiItineraryGen
from . import serializers

class FetchAIViewSet(viewsets.ModelViewSet):
    queryset = ItineraryPlanner.objects.all()
    serializer_class = serializers.ItineraryPlannerSerializer
    
    def create(self, request, *args, **kwargs):
        prompt = request.data.get("prompt", "")
        preferences = request.data.get("preferences", "")
        
        try:
            result = GeminiItineraryGen(prompt, preferences)
            return Response(status=status.HTTP_200_OK, data=result)
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"error": str(e)})

    @action(detail=False, methods=['GET'])
    def fetch_hotels(self, request):
        return Response(status=404, data={"message": "Deprecated"})

    @action(detail=False, methods=['GET'])
    def fetch_flights(self, request):
        return Response(status=404, data={"message": "Deprecated"})

    @action(detail=False, methods=['POST'])
    def download_audiobook(self, request):
        # Mock implementation returning success
        return Response(status=200, data={"message": "Audiobook generated successfully"})

    @action(detail=False, methods=['POST'])
    def download_pdf(self, request):
        # Mock implementation returning success
        return Response(status=200, data={"message": "PDF generated successfully"})

    @action(detail=False, methods=['POST'])
    def send_itinerary_whatsapp(self, request):
        itinerary_data = request.data.get("itinerary", [])
        
        # Format the JSON itinerary array into a string
        if isinstance(itinerary_data, list):
            formatted_itinerary = "\\n\\n".join([f"{item.get('place', '')}: {item.get('content', '')}" for item in itinerary_data])
        else:
            formatted_itinerary = str(itinerary_data)
        
        if not formatted_itinerary.strip():
            formatted_itinerary = "Here is your itinerary!"

        try:
            account_sid = os.environ.get('TWILIO_ACCOUNT_SID', '')
            auth_token = os.environ.get('TWILIO_AUTH_TOKEN', '')
            client = Client(account_sid, auth_token)

            message = client.messages.create(
                from_='whatsapp:+14155238886',
                body=formatted_itinerary[:1600], # Twilio limit
                to='whatsapp:+918369386540'
            )
            return Response(status=200)
        except Exception as e:
            print("Error sending whatsapp:", e)
            return Response(status=500, data={"error": str(e)})