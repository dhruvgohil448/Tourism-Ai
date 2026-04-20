from django.db import models
from cities_light.models import Country, SubRegion, Region

GENDER = [
    ('male', 'Male'),
    ('female', 'Female'),
    ('other', 'Other'),
]

CATEGORIES = [
    ('North_India', 'North India'),
    ('South_India', 'South India'),
    ('West_India', 'West India'),
    ('East_India', 'East India'),
    ('Foreign', 'Foreign'),
]


TYPE_CHOICES = [
    ('foreign', 'Foreign'),
    ('monsoon_musts', 'Monsoon Musts'),
    ('winter_wonders', 'Winter Wonders'),
    ('summer_specials', 'Summer Specials'),
    ('pilgrimage', 'Pilgrimage'),
    ('trekking', 'Trekking'),
    ('camping', 'Camping'),
    ('safari', 'Safari'),
    ('agro_tourism', 'Agro Tourism'),
    ('rafting', 'Rafting'),
    ('carnival', 'Carnival'),
]


class Traveller(models.Model):
    name = models.CharField(max_length=120)
    dob = models.DateField()
    gender = models.CharField(choices=GENDER, max_length=20)
    age = models.PositiveSmallIntegerField(default=0)

    def __str__(self) -> str:
        return self.name

class Order(models.Model):
    travellers = models.ManyToManyField(to="tour.Traveller")

    email = models.EmailField(max_length=120, unique=True)
    contact_number = models.CharField(max_length=12)

    address = models.TextField()
    city = models.ForeignKey(SubRegion, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={"country__name": "India"})

    special_requests = models.TextField()

    is_confirmed = models.BooleanField(default=False)

    """
    {
        title: "",
        content: ""
    }
    """
    review = models.JSONField(default=dict, null=True, blank=True)

    def __str__(self) -> str:
        return self.email


class Image(models.Model):
    tour = models.ForeignKey(to="tour.Tour", on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(upload_to="tour_images/")

    def __str__(self) -> str:
        return f"{self.image.name} ({self.image.path})"

class Slot(models.Model):
    tour = models.ForeignKey(to="tour.Tour", on_delete=models.CASCADE, null=True, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self) -> str:
        return self.start_date.strftime("%dth, %b %Y %H:%M") + " | " +  self.end_date.strftime("%dth, %b %Y %H:%M")

class Tour(models.Model):
    title = models.CharField(max_length=200)
    overview = models.TextField()
    destinations = models.JSONField(default=list)
    
    days = models.PositiveIntegerField(default=2)
    nights = models.PositiveIntegerField(default=3)
    
    price = models.PositiveIntegerField(default=0) # Per Person 
    
    itinerary = models.JSONField(default=list, null=True, blank=True)
    category = models.CharField(choices=CATEGORIES, max_length=40)
    tour_type = models.CharField(choices=TYPE_CHOICES, max_length=60, default='camping')
    is_bestsellers = models.BooleanField(default=False)

    orders = models.ManyToManyField(to="tour.Order")

    def __str__(self) -> str:
        return self.title
    
class TourInquiry(models.Model):
    tour = models.ForeignKey(to="tour.Tour", on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    contact_number = models.CharField(max_length=20)
    tour_description = models.TextField()
    departure_date = models.DateField()
    number_of_days = models.PositiveIntegerField()

    def __str__(self):
        return self.full_name