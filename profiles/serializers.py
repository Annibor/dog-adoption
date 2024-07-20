from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    
  """
  Serializes a Profile model.
  """
  class Meta:
    model = Profile
    fields = ['username',
              'first_name',
              'last_name',
              'email',
              'phone',
              'address',
              'city',
              'state',
              'zip_code',
              'has_other_pets',
              'has_children']