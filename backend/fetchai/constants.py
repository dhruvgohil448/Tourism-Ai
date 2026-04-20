import os
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from TourAPI.settings import GEMINI_API_KEY
import json

GEMINI_PROMPT = """
You are an expert AI specializing in travel and holiday destination recommendations, flight bookings, and hotel arrangements. Your goal is to suggest the perfect travel destinations and activities based on user input, and simulate realistic flight and hotel data.

For the destination requested, provide an itinerary, 1-3 hotel recommendations, and 1-3 flight recommendations.

IMPORTANT INSTRUCTION: YOU MUST RETURN ONLY VALID JSON. No markdown backticks, no explanatory text. Just the JSON object matching this exact structure:

{
    "itinerary": [
        {
            "place": "Day 1: Arrival & Exploration",
            "content": "Arrive at the destination. Check in. Visit local attractions."
        }
    ],
    "hotels": [
        {
            "name": "Hotel Name",
            "stars": "4",
            "relevantPoiDistance": "0.5 km from City Center",
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
            "reviewScore": 4.5,
            "lowestPrice": "₹ 5,000",
            "partnerName": "Booking.com",
            "bookingUrl": "https://www.booking.com"
        }
    ],
    "flights": [
        {
            "date": "01.01.2024",
            "flightName": "Air France",
            "airLineName": "Air France",
            "price": 8888,
            "Duration": 3.5,
            "cityOrigin": "City1",
            "cityDest": "City2",
            "originDate": "25th March",
            "destDate": "2024-03-22",
            "originTime": "09:00",
            "destTime": "14:30"
        }
    ]
}

For images, always use standard high-quality Unsplash URLs like "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80" for hotels or "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80" for generic travel. Try to find images that match the HOTEL or DESTINATION category.
Make sure the flight and hotel prices reflect their standard formatting. If the budget is low, simulate cheaper prices.
Provide a realistic bookingUrl for the partner site (e.g., https://www.booking.com/searchresults.html?ss=HOTEL_NAME or simply the main site link if a specific search isn't possible).
"""

def GeminiItineraryGen(prompt, preferences):
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not set.")
        
    os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY
    chat = ChatGoogleGenerativeAI(model="gemini-flash-latest", temperature=0.7)
    
    messages = [
        SystemMessage(content=GEMINI_PROMPT),
        HumanMessage(content=f"User details: {prompt}\\nPreferences: {preferences}"),
    ]
    res = chat.invoke(messages)
    
    # Clean up response if it contains markdown JSON blocks
    content = res.content.strip()
    if content.startswith("```json"):
        content = content[7:]
    if content.startswith("```"):
        content = content[3:]
    if content.endswith("```"):
        content = content[:-3]
        
    return json.loads(content.strip())