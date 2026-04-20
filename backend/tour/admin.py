from django.contrib import admin
from django.utils.html import format_html
from django.template.loader import render_to_string
from django import forms

from .models import Traveller, Order, Image, Slot, Tour, TourInquiry
from cities_light.models import City, Country, SubRegion, Region

admin.site.unregister(City)
admin.site.unregister(Country)
admin.site.unregister(SubRegion)
admin.site.unregister(Region)

class TravellerAdmin(admin.ModelAdmin):
    list_display = ('name', 'dob', 'gender', 'age')
    search_fields = ('name',)
    list_filter = ('gender',)
    list_per_page = 20
    date_hierarchy = 'dob'
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'dob', 'gender', 'age')
        }),
    )

class OrderTravellerInline(admin.TabularInline):
    model = Order.travellers.through
    extra = 1
    verbose_name_plural = "Travellers Details" 

class OrderAdmin(admin.ModelAdmin):
    list_display = ('email', 'contact_number', 'city')
    search_fields = ('email', 'contact_number')
    list_per_page = 20

    fieldsets = (
        ('Contact Information', {
            'fields': ('email', 'contact_number')
        }),
        ('Address', {
            'fields': ('address', 'city')
        }),
        ('Special Requests', {
            'fields': ('special_requests',)
        }),
        ('User Review', {
            'fields': ('review', 'display_review',),
            'classes': ('collapse',)
        }),
    )

    inlines = [OrderTravellerInline]
    readonly_fields = ('display_review',)

    def display_review(self, obj):
        data = obj.review
        html = render_to_string("review.html", context=dict(data=data))
        return format_html(html)
    
    display_review.short_description = "Review"

class TourImageInline(admin.StackedInline):
    model = Image
    extra = 1
    verbose_name_plural = "Banner Images" 

class TourSlotInline(admin.StackedInline):
    model = Slot
    extra = 1
    verbose_name_plural = "Slot Details" 

class TourOrderInline(admin.TabularInline):
    model = Tour.orders.through
    extra = 1
    verbose_name_plural = "Order Details"

class TourAdmin(admin.ModelAdmin):

    class Media:
        js = ('tour/add_itinerary.js',)

    list_display = ('title', 'days', 'price', 'category')
    search_fields = ('title', 'category')
    list_filter = ('category', 'tour_type',)
    list_per_page = 20

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'overview', 'days', 'nights', 'price', 'category', 'tour_type', 'is_bestsellers')
        }),
        ('Destinations', {
            'fields': ('destinations', 'display_destinations',)
        }),
        ('Itinerary', {
            'fields': ('itinerary', 'display_itinerary_table', 'display_itinerary_form',)
        }),
    )

    inlines = [TourImageInline, TourSlotInline, TourOrderInline]
    readonly_fields = ('display_itinerary_table', 'display_itinerary_form', 'display_destinations',)

    def save_model(self, request, obj, form, change):
        places = request.POST.getlist('place[]')
        contents = request.POST.getlist('content[]')

        to_delete = request.POST.getlist('delete_place[]')
        if to_delete:
            for i in to_delete:
                del obj.itinerary[int(i)]

        places, contents = list(filter(lambda x: x != "", places)), list(filter(lambda x: x != "", contents))

        if len(places) == len(contents):
            itinerary_data = [{"place": place, "content": content} for place, content in zip(places, contents)]
            for i in itinerary_data:
                obj.itinerary.append(i)

        super().save_model(request, obj, form, change)

    def display_itinerary_form(self, obj):
        html = render_to_string("add_itinerary.html")
        return format_html(html)

    def display_itinerary_table(self, obj):
        data = obj.itinerary
        html = render_to_string("itinerary.html", context=dict(data=data))
        return format_html(html)
    
    def display_destinations(self, obj):
        data = obj.destinations
        html = render_to_string("destination.html", context=dict(data=data))
        return format_html(html)
    

    TourImageInline.fieldsets = (
        ('Tour Images', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
    )

    TourSlotInline.fieldsets = (
        ('Tour Slots', {
            'fields': ('start_date', 'end_date',),
            'classes': ('collapse',)
        }),
    )

    display_itinerary_table.short_description = "Itinerary Table"
    display_itinerary_form.short_description = "Add Itinerary"
    display_destinations.short_description = "Destinations"

@admin.register(TourInquiry)
class TourInquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'contact_number', 'departure_date')
    search_fields = ('full_name', 'email', 'tour__title')
    list_filter = ('tour',)
    
    fieldsets = (
        ('Tour Details', {
            'fields': ('tour', 'departure_date', 'number_of_days', 'tour_description')
        }),
        ('Contact Information', {
            'fields': ('full_name', 'email', 'contact_number')
        }),
    )

admin.site.register(Traveller, TravellerAdmin)
admin.site.register(Order, OrderAdmin)
# admin.site.register(Image, ImageAdmin)
# admin.site.register(Slot, SlotAdmin)
admin.site.register(Tour, TourAdmin)

# admin.site.unregister(Slot)
# admin.site.unregister(Image)