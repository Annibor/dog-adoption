from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from .models import AdoptionEvent, AdoptionEventRegistration
from .serializers import AdoptionEventSerializer, AdoptionEventRegistrationSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from profiles.models import Profile


# Create your views here.
class AdoptionEventList(generics.ListCreateAPIView):
  """
  A view for listing and creating AdoptionEvent objects.
  Only admins can create AdoptionEvent objects.
  """
  queryset = AdoptionEvent.objects.all().order_by('-created_at')
  serializer_class = AdoptionEventSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

  def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


class AdoptionEventDetail(generics.RetrieveAPIView):
  """
  A view for retrievinga single AdoptionEvent object.
  """
  queryset = AdoptionEvent.objects.all()
  serializer_class = AdoptionEventSerializer


class EventRegistration(generics.CreateAPIView):
  """
  A view for listing and creating EventRegistration objects.
  Only authenticated users can register for events.
  """
  serializer_class = AdoptionEventRegistrationSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return AdoptionEventRegistration.objects.filter(user=self.request.user)
  
  def perform_create(self, serializer):
    event = get_object_or_404(AdoptionEvent, pk=self.kwargs['event_pk'])
    serializer.save(user=self.request.user, event=event)


class EventRegistrationDetail(generics.RetrieveAPIView):
  """
  A view for retrieving and deleting a single EventRegistration object.
  Only the user who registered can delete their registration.
  """
  serializer_class = AdoptionEventRegistrationSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return AdoptionEventRegistration.objects.filter(user=self.request.user)
