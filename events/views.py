from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AdoptionEvent, AdoptionEventRegistration
from profiles.models import Profile
from .serializers import AdoptionEventSerializer, AdoptionEventRegistrationSerializer
import logging

logger = logging.getLogger(__name__)

class AdoptionEventList(generics.ListCreateAPIView):
    queryset = AdoptionEvent.objects.all().order_by('-created_at')
    serializer_class = AdoptionEventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

class AdoptionEventDetail(generics.RetrieveAPIView):
    queryset = AdoptionEvent.objects.all()
    serializer_class = AdoptionEventSerializer

class UserEventRegistrations(APIView):
    serializer_class = AdoptionEventRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        registrations = AdoptionEventRegistration.objects.filter(user=request.user.profile)
        serializer = AdoptionEventRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)

class EventRegistrationListCreateDelete(APIView):
    serializer_class = AdoptionEventRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        registrations = AdoptionEventRegistration.objects.filter(user=request.user.profile, event_id=pk)
        serializer = AdoptionEventRegistrationSerializer(registrations, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request, pk):
        event = get_object_or_404(AdoptionEvent, pk=pk)
        if AdoptionEventRegistration.objects.filter(event=event, user=request.user.profile).exists():
            return Response({"detail": "You have already registered for this event."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = AdoptionEventRegistrationSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            try:
                logger.debug(f"Attempting to save registration for user {request.user.profile} with data: {serializer.validated_data}")
                serializer.save(user=request.user.profile, event=event)
                logger.info("Registration saved successfully.")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error while saving registration: {e}", exc_info=True)
                return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        registration = get_object_or_404(AdoptionEventRegistration, pk=pk)
        if registration.user == request.user.profile:
            registration.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)