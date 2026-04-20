from django.contrib import admin
from .models import ItineraryPlanner

class ItineraryPlannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_date', 'end_date')
    list_filter = ('start_date', 'end_date')
    search_fields = ('id', 'start_date', 'end_date')
    date_hierarchy = 'start_date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'prompt', 'preferences', 'image', 'start_date', 'end_date')
        }),
        ('Advanced Information', {
            'fields': ('raw_response', 'places_details'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('raw_response', 'places_details', 'id',)

admin.site.register(ItineraryPlanner, ItineraryPlannerAdmin)
