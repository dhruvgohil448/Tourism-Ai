from typing import Any
from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from TourAPI import settings
from .models import Order, Tour, TourInquiry, Traveller
from . import serializers

# import razorpay
from datetime import datetime

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer

class TourViewSet(viewsets.ModelViewSet):
    queryset = Tour.objects.all()
    serializer_class = serializers.TourSerializer

    def __init__(self, **kwargs: Any) -> None:
        # self.razorpay_client: razorpay.Client = razorpay.Client(auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))
        self.currency = "INR"
        super().__init__(**kwargs)

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.ExploreTourSerializer
        return self.serializer_class

    def get_queryset(self):
        filters = self.request.query_params
        
        # Start with an initial query that includes all tours
        query = Q()

        # Type filter
        tour_types = filters.get('types', False)
        if tour_types:
            query &= Q(tour_type__in=tour_types.split(','))

        # Category filter
        categories = filters.get('categories', False)
        if categories:
            query &= Q(category__in=categories.split(','))

        bestseller = filters.get('bestseller', False)
        if bestseller:
            query &= Q(is_bestsellers=True)

        # Slot falling in month filter
        months = filters.get('months', False)
        if months:
            month_query = Q()
            for month in months.split(','):
                year = datetime.now().year
                start_date = datetime(year=year, month=int(month), day=1)
                if int(month) == 12:
                    end_date = datetime(year=year + 1, month=1, day=1)
                else:
                    end_date = datetime(year=year, month=int(month) + 1, day=1)
                month_query |= Q(slot__start_date__gte=start_date, slot__end_date__lt=end_date)
            query &= month_query

        duration = int(filters.get('duration', 0))
        if duration:
            query &= Q(days__lte=duration)

        # Price filter
        price = filters.get('price')
        if price:
            if price == 'htl':
                return self.queryset.filter(query).order_by('-price')
            elif price == 'lth':
                return self.queryset.filter(query).order_by('price')

        # Apply the combined query to filter the tours
        return self.queryset.filter(query)
    
    @action(detail=True, methods=['GET'])
    def inquiry(self, request, pk=None):
        instance = self.get_object()

        request.data["tour"] = instance.id
        serializer = serializers.TourInquirySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['GET'])
    def similar_tours(self, request, pk=None):
        tour =  self.get_object()

        tours = Tour.objects.filter(tour_type=tour.tour_type).exclude(id=tour.id)
        serializer = serializers.ExploreTourSerializer(tours, many=True)
        return Response(serializer.data)
    
    # @action(detail=True, methods=['GET'])
    # def payment_checkout(self, request, pk=None):
    #     instance = self.get_object()
    #     razorpay_order = self.razorpay_client.order.create(dict(amount=amount*100, currency=self.currency, payment_capture="1"))
    
    #     # order id of newly created order.
    #     razorpay_order_id = razorpay_order['id']
    #     protocol = "https://" if 'HTTPS' in request.META and request.META['HTTPS'] == 'on' else "http://"
    #     base_domain = request.META.get('HTTP_HOST')
    #     callback_url = f"{protocol}{base_domain}/tours/{instance.id}/payment_callback"

    #     email = request.data.get("email")
    #     number = request.data.get("contact_number")
    #     address = request.data.get("address")
    #     city = request.data.get("city")
    #     special_requests = request.data.get("special_requests")

    #     travellers = request.data.getlist("travellers[]")
    #     amount = request.data.get("amount")

    #     order = Order.objects.create(email=email, contact_number=number, address=address,
    #         city=city, special_requests=special_requests)

    #     for traveller in travellers:
    #         obj = Traveller.objects.create(**traveller)
    #         obj.save()
            
    #         order.travellers.add(obj) # i wanna add the traveller instance

    #     order.save()

    #     data = {
    #         "order_id" : order.id,
    #         "razorpay_merchant_key": "RAZOR_KEY",
    #         "razorpay_amount": amount,
    #         "razorpay_order_id" : razorpay_order["id"],
    #         "currency" : 'INR',
    #         "callback_url": callback_url
    #     }

    #     # save order Details to frontend
    #     return Response(data, status=status.HTTP_200_OK)

    # @action(detail=True, methods=['GET'])
    # def payment_callback(self, request, pk=None):
        instance = self.get_object()

        try:
            # get the required parameters from post request.
            payment_id = request.POST.get('razorpay_payment_id', '')
            razorpay_order_id = request.POST.get('razorpay_order_id', '')
            signature = request.POST.get('razorpay_signature', '')
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': signature
            }
 
            # verify the payment signature.
            result = self.razorpay_client.utility.verify_payment_signature(params_dict)
            if result is not None:
                amount = 10000  # Rs. 100
                try:
                    # capture the payemt
                    self.razorpay_client.payment.capture(payment_id, amount)
 
                    # i wanna set the order.is_confirmed field to true here if the payment is confirmed here for the order we created earlies 

                    # render success page on successful caputre of payment
                    return Response(status=status.HTTP_200_OK)
                except:
                    # if there is an error while capturing payment.
                    return Response(result.error, status=status.HTTP_400_BAD_REQUEST)
            else:
 
                # if signature verification fails.
                return Response("invalid signature", status=status.HTTP_400_BAD_REQUEST)
        except:
            # if we don't find the required parameters in POST data
            return Response("invalid signature", status=status.HTTP_400_BAD_REQUEST)