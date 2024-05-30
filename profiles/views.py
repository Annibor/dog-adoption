from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.response import Response

# Create your views here.

class ProfileList(generics.ListAPIView):
  """
  A view for listing all user profiles.
  """
  queryset = Profile.objects.all()
  serializer_class = ProfileSerializer
  permission_classes = [IsAuthenticated]


class ProfileDetail(generics.RetrieveUpdateAPIView):
  """
  A view for displaying and updating a user's profile.
  """
  serializer_class = ProfileSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    """
    Retrieves the Profile object for the current user.
    """
    return get_object_or_404(Profile, owner=self.request.user)