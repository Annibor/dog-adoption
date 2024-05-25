from rest_framework import generics, permissions
from .models import AdoptionEvent, AdoptionEventRegistration
from .serializers import AdoptionEventSerializer, AdoptionEventRegistrationSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from profiles.models import Profile


# Create your views here.
class AdoptionEventList(generics.ListCreateAPIView):
  """
  A view for listing and creating AdoptionEvent objects.
  Only admins can create AdoptionEvent objects.
  """
  queryset = AdoptionEvent.objects.all()
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





