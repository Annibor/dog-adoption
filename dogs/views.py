from rest_framework import generics
from .models import Dog
from .serializers import DogSerializer

# Create your views here.
class DogListView(generics.ListAPIView):
  """
  A view for displaying a list of all dogs.
  """
  queryset = Dog.objects.all()
  serializer_class = DogSerializer