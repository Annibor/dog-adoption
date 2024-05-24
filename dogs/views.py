
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
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
  

class DogDetailView(generics.RetrieveAPIView):
  """
  Retrieve the details of a single dog available for adoption.
  """
  queryset = Dog.objects.all()
  serializer_class = DogSerializer
  lookup_field = 'pk'  # This is the default and can be omitted unless you need a different field.

  def get(self, request, pk):
    dog = get_object_or_404(Dog, pk=pk)
    serializer = DogSerializer(dog, context={'request': request})
    return Response(serializer.data)
