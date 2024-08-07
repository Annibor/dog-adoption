from rest_framework import serializers
from .models import Dog, AdoptionApplication


class DogSerializer(serializers.ModelSerializer):
    featured_image = serializers.SerializerMethodField()

    class Meta:
        model = Dog
        fields = "__all__"

    def get_featured_image(self, obj):
        request = self.context.get('request')
        image_url = obj.featured_image.url
        if image_url and not image_url.startswith('http'):
            return request.build_absolute_uri(image_url)
        return image_url



class AdoptionApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdoptionApplication
        fields = "__all__"

