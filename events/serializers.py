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

    def validate(self, data):
        event = data.get('event')
        user = data.get('user')
        if event and user:
            if AdoptionEventRegistration.objects.filter(event=event,
                                                        user=user).exists():
                raise (serializers.
                       ValidationError({"detail":
                                        "Already registered for this event."}))
        return data
