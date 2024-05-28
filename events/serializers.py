from rest_framework import serializers
from .models import AdoptionEvent, AdoptionEventRegistration


class AdoptionEventSerializer(serializers.ModelSerializer):
  """
  A serializer that serializes AdoptionEvent objects.
  """
  class Meta:
    model = AdoptionEvent
    fields = ['title', 'description', 'date', 'location', 'created_at']


class AdoptionEventRegistrationSerializer(serializers.ModelSerializer):
  """
  A serializer that serializes AdoptionEventRegistration objects.
  """
  class Meta:
    model = AdoptionEventRegistration
    fields = ['event', 'user', 'created_at']

