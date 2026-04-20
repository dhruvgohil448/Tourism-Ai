import uuid, json, os
from django.db import models

from TourAPI.settings import GEMINI_API_KEY, CHATGPT_API_KEY, RAZOR_KEY_ID
from .constants import GEMINI_PROMPT, GeminiItineraryGen

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI

class ItineraryPlanner(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    
    prompt = models.TextField()
    preferences = models.CharField(max_length=100)  
    image = models.ImageField(upload_to="gemini_vision/", null=True, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    
    raw_response = models.JSONField(default=list)
    places_details = models.JSONField(default=list)
    
    
    def __str__(self) -> str:
        return str(self.id)
    
    def format_timestamps(self):
        pass
    
    def generate_gemini_vision_prompt(self):
        os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY
        llm = ChatGoogleGenerativeAI(model="gemini-flash-latest")
        message = HumanMessage(
            content=[
                {
                    "type": "text",
                    "text": "What's in this image?",
                },  # You can optionally provide text parts
                # {"type": "image_url", "image_url": "https://plus.unsplash.com/premium_photo-1664124888904-435121e89c74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbmluZyUyMGJlYWNofGVufDB8fDB8fHww"},
                {"type": "image_url", "image_url": self.image.path},
            ]
        )
        res = llm.invoke([message])
        return res.content
    
    def generate_place_details(self):
        return GeminiItineraryGen(self.prompt, self.preferences)
    
