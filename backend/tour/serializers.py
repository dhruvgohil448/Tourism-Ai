from rest_framework import serializers
from .models import Order, Tour, Traveller, Slot, Image, TourInquiry

from cities_light.models import Region

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        exclude = ['tour']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        exclude = ['tour']

class TravellerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Traveller
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    travellers = TravellerSerializer(many=True)
    city = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_city(self, obj):
        region = Region.objects.get(id=obj.city.region_id)

        return f"{obj.city.name} ({region.display_name})"

class ExploreTourSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Tour
        fields = ['id', 'title', 'overview', 'image']

    def get_image(self, obj):
        image = Image.objects.filter(tour=obj)[0]
        return image.image.url

class TourSerializer(serializers.ModelSerializer):
    
    reviews = serializers.SerializerMethodField()
    slots = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    tour_type = serializers.CharField(source='get_tour_type_display', read_only=True)
    category = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Tour 
        exclude = ['orders']

    def get_reviews(self, obj):
        customers = obj.orders.all()
        reviews = []
        for order in customers:
            data = {}
            data["customer"] = order.travellers.first().name
            
            region = Region.objects.get(id=order.city.region_id)
            data["city"] = f"{order.city.name} ({region.display_name})"

            data["review"] = order.review
            reviews.append(data)

        return reviews

    def get_slots(self, obj):
        queryset = Slot.objects.filter(tour=obj)
        serializer = SlotSerializer(queryset, many=True)
        return serializer.data
    
    def get_images(self, obj):
        queryset = Image.objects.filter(tour=obj)
        serializer = ImageSerializer(queryset, many=True)
        return serializer.data
    
class TourInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourInquiry
        fields = '__all__'