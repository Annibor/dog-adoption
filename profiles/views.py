from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer

# Create your views here.
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
    return self.request.user.profile