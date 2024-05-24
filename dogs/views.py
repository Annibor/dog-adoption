
from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Dog
from .serializers import DogSerializer

# Create your views here.
class DogListView(generics.ListAPIView):
  """
  A view for displaying a list of all dogs.
  """
  queryset = Dog.objects.all()
  serializer_class = DogSerializer
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['name',
                      'breed',
                      'age',
                      'gender',
                      'temperament',
                      'good_with_children',
                      'good_with_other_dogs']
  search_fields = ['name',
                   'breed',
                   'age',
                   'gender',
                   'temperament',
                   'good_with_children',
                   'good_with_other_dogs']