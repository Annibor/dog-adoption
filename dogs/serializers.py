from rest_framework import serializers
from .models import Dog, AdoptionApplication


class DogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = "__all__"


class AdoptionApplicationSerializer(serializers.ModelSerializer):
    dog = DogSerializer(read_only=True)

    class Meta:
        model = AdoptionApplication
        fields = "__all__"

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user.profile
        return super().create(validated_data)
