
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Dog, AdoptionApplication
from profiles.models import Profile
from .serializers import DogSerializer, AdoptionApplicationSerializer

# Create your views here.


class DogListView(generics.ListAPIView):
    """
    A view for displaying a list of all dogs.
    """
    queryset = Dog.objects.all().order_by('-created_at')
    serializer_class = DogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
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
    
    def get_serializer_context(self):
        return {'request': self.request}


class DogDetailView(generics.RetrieveAPIView):
    """
    Retrieve the details of a single dog available for adoption.
    """
    queryset = Dog.objects.all()
    serializer_class = DogSerializer
    lookup_field = 'pk'

    def get(self, request, pk):
        dog = get_object_or_404(Dog, pk=pk)
        serializer = DogSerializer(dog, context={'request': request})
        return Response(serializer.data)


class AdoptionApplicationListCreatView(generics.ListCreateAPIView):
    """
    A view for listing and creating adoption applications.
    Only authenticated users can create adoption applications.
    """
    serializer_class = AdoptionApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns a list of applications to adopt dogs
        for the current user if logged in.
        If not logged in, returns   an empty list.
        """
        user = self.request.user
        if user.is_authenticated:
            return AdoptionApplication.objects.filter(user=user.profile)
        return AdoptionApplication.objects.none()


    def perform_create(self, serializer):
        """
        Saves the current adoption application with the current user.
        """
        profile = Profile.objects.filter(owner=self.request.user).first()
        print('Received data:', self.request.data)
        print('Profile:', profile)
        serializer.save(user=profile)


class AdoptionApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    A view for retrieving, updating, and deleting a
    single adoption application.
    Only the user who created the application can
    update or delete it.
    """
    queryset = AdoptionApplication.objects.all()
    serializer_class = AdoptionApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns a list of applications to adopt dogs for the
        current user if logged in. If not logged in,   returns   an empty list.
        Only the owner of the application or an admin can update or delete it.
        """
        user = self.request.user
        if user.is_staff:
            return AdoptionApplication.objects.all()
        if user.is_authenticated:
            return AdoptionApplication.objects.filter(user=user.profile)
        return AdoptionApplication.objects.none()
