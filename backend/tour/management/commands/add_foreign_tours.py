from django.core.management.base import BaseCommand
from tour.models import Tour, Image, Slot
from django.utils import timezone
from datetime import timedelta
from django.core.files import File
import os

class Command(BaseCommand):
    help = 'Seed foreign tour packages with images'

    def handle(self, *args, **options):
        # Data for foreign tours
        tours_data = [
            {
                'title': 'Best of Paris: City of Lights',
                'overview': 'Explore the romantic streets of Paris, visit the Eiffel Tower, the Louvre museum, and enjoy a cruise on the Seine. A perfect getaway for couples and families alike.',
                'destinations': ['Paris', 'Versailles', 'Seine River'],
                'days': 6,
                'nights': 5,
                'price': 150000,
                'itinerary': [
                    {'place': 'Arrival in Paris', 'content': 'Welcome to the City of Light! Upon arrival at Charles de Gaulle Airport, transfer to your hotel. In the evening, witness Paris come alive with a panoramic "Glow of the Night" tour, seeing the Eiffel Tower, Arc de Triomphe, and Champs-Élysées beautifully illuminated.'},
                    {'place': 'Eiffel Tower & Seine River Cruise', 'content': 'Morning visit to the iconic Eiffel Tower (2nd level access included). Experience breathtaking views of the city. Later, enjoy a leisurely cruise along the River Seine, passing by the Notre-Dame Cathedral and the Musée d\'Orsay.'},
                    {'place': 'Louvre Museum & Montmartre', 'content': 'Deep dive into art history at the Louvre Museum, home to thousands of classic and modern masterpieces. In the afternoon, explore the bohemian district of Montmartre, visit the Sacré-Cœur Basilica, and see artists at work in Place du Tertre.'},
                    {'place': 'Palace of Versailles', 'content': 'Excursion to the majestic Palace of Versailles. Explore the Hall of Mirrors, the King\'s Grand Apartments, and spend hours wandering through the impeccably manicured royal gardens. Return to Paris for an evening at leisure.'},
                    {'place': 'Latin Quarter & Shopping', 'content': 'Stroll through the historic Latin Quarter, visit the Panthéon, and the Luxembourg Gardens. Use your afternoon for some high-end shopping at Galeries Lafayette or explore the hidden passages of Paris.'},
                    {'place': 'Departure from Paris', 'content': 'Enjoy your final French breakfast at a local café. Depending on your flight time, some last-minute souvenir shopping before your transfer to the airport for your journey home.'}
                ],
                'category': 'Foreign',
                'tour_type': 'foreign',
                'is_bestsellers': True,
                'image_name': 'paris.png'
            },
            {
                'title': 'Dazzling Dubai Experience',
                'overview': 'Experience the luxury of Dubai. From the world\'s tallest building to traditional souks and desert safaris, Dubai offers a unique blend of modern and traditional.',
                'destinations': ['Dubai', 'Abu Dhabi', 'Desert Safari'],
                'days': 5,
                'nights': 4,
                'price': 85000,
                'itinerary': [
                    {'place': 'Arrival & Dhow Cruise', 'content': 'Arrive at Dubai International Airport and transfer to your hotel. In the evening, enjoy a traditional Dhow Cruise at Dubai Creek with a lavish buffet dinner and Tanoura dance performance under the starlit sky.'},
                    {'place': 'City Tour & Burj Khalifa', 'content': 'Half-day city tour including Jumeirah Mosque, Burj Al Arab (photo stop), and Atlantis The Palm. Afternoon visit to the 124th floor of Burj Khalifa, the world\'s tallest building, followed by the spectacular Dubai Fountain show.'},
                    {'place': 'Desert Safari Adventure', 'content': 'Morning free for shopping at the Gold Souk or Dubai Mall. Afternoon, head out for a thrilling Desert Safari. Enjoy dune bashing, camel riding, henna painting, and a BBQ dinner at a traditional Bedouin camp.'},
                    {'place': 'Abu Dhabi Day Trip', 'content': 'Visit the capital city, Abu Dhabi. Explore the magnificent Sheikh Zayed Grand Mosque, a masterpiece of Islamic architecture. Drive along the Corniche and visit Ferrari World (photo stop) on Yas Island.'},
                    {'place': 'Departure from Dubai', 'content': 'After breakfast, transfer to the airport for your flight back home with wonderful memories of your Dubai vacation.'}
                ],
                'category': 'Foreign',
                'tour_type': 'foreign',
                'is_bestsellers': False,
                'image_name': 'dubai.png'
            },
            {
                'title': 'Exotic Bali Tropical Paradise',
                'overview': 'Relax on the beautiful beaches of Bali, explore vibrant culture, lush rice terraces, and ancient temples. The ultimate tropical vacation.',
                'destinations': ['Ubud', 'Seminyak', 'Uluwatu'],
                'days': 7,
                'nights': 6,
                'price': 65000,
                'itinerary': [
                    {'place': 'Ubud Arrival', 'content': 'Arrive in Denpasar and transfer to the cultural heart of Bali—Ubud. Spend the day relaxing by the infinity pool or exploring the local art markets.'},
                    {'place': 'Ubud Sacred Sites & Rice Terraces', 'content': 'Visit the Sacred Monkey Forest Sanctuary, Tirta Empul Holy Water Temple, and the stunning Tegalalang Rice Terraces. Enjoy a traditional Balinese lunch overlooking the lush valley.'},
                    {'place': 'Kintamani & Mt. Batur', 'content': 'Full-day tour to Kintamani to witness the majestic Mt. Batur volcano and its crater lake. On the way back, stop at a local coffee plantation to taste the famous Luwak coffee.'},
                    {'place': 'Transfer to Seminyak & Beach Sunset', 'content': 'Check out from Ubud and drive to Seminyak. Spend the afternoon on the golden sands of Seminyak Beach. In the evening, visit Tanah Lot Temple, perched on a rock in the sea, for a spectacular sunset.'},
                    {'place': 'South Bali & Uluwatu', 'content': 'Explore the Southern beaches of Nusa Dua and Pandawa. In the late afternoon, head to Uluwatu Temple on a steep cliff. Watch the traditional Kecak Fire Dance performance as the sun sets over the Indian Ocean.'},
                    {'place': 'Leisure & Spa Day', 'content': 'A free day for you to indulge in a traditional Balinese massage or explore the trendy boutiques and cafes of Seminyak. Perfect for last-minute shopping.'},
                    {'place': 'Departure from Denpasar', 'content': 'Final breakfast in paradise before your transfer to the airport for your onward journey.'}
                ],
                'category': 'Foreign',
                'tour_type': 'foreign',
                'is_bestsellers': True,
                'image_name': 'bali.png'
            }
        ]

        media_path = os.path.join('media', 'tour_images')

        for tour_info in tours_data:
            image_name = tour_info.pop('image_name')
            
            # Create or update Tour
            tour, created = Tour.objects.update_or_create(
                title=tour_info['title'],
                defaults=tour_info
            )
            
            if created:
                self.stdout.write(self.style.SUCCESS(f"Successfully created tour: {tour.title}"))
            else:
                self.stdout.write(self.style.WARNING(f"Updated existing tour: {tour.title}"))

            # Associate Image
            image_rel_path = f"tour_images/{image_name}"
            # Check if image already exists for this tour
            if not Image.objects.filter(tour=tour, image=image_rel_path).exists():
                Image.objects.create(
                    tour=tour,
                    image=image_rel_path
                )
                self.stdout.write(self.style.SUCCESS(f"Added image for {tour.title}"))

            # Create some slots (next 3 months)
            start_date = timezone.now() + timedelta(days=30)
            for i in range(3):
                slot_start = start_date + timedelta(days=i*30)
                slot_end = slot_start + timedelta(days=tour.days)
                if not Slot.objects.filter(tour=tour, start_date=slot_start).exists():
                    Slot.objects.create(
                        tour=tour,
                        start_date=slot_start,
                        end_date=slot_end
                    )
        
        self.stdout.write(self.style.SUCCESS("Foreign tours seeding completed!"))
