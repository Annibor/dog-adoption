from rest_framework import serializers
from .models import Favorites

class FavoritesSerializer(serializers.ModelSerializer):
  """
  
  """
  class Meta:
    model = Favorites
    fields = "__all__"
    read_only_fields = ['user']
    
  def create(self, validated_data):
    """
    Create a new favorite or return existing one to avoid duplicates.
    """
    user = self.context['request'].user.profile
    dog = validated_data['dog']
    favorite, created = Favorites.objects.get_or_create(user=user, dog=dog)
    if not created:
      favorite.delete()
      return None
    return favorite
  
  