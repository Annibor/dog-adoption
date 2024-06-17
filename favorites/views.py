from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Favorites
from dogs.models import Dog
from .serializers import FavoritesSerializer
from rest_framework import status

class FavoritesView(APIView):
    """
    A view for displaying and updating a user's favorite dogs.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve a list of all favorite dogs for the current user.
        """
        user = request.user.profile
        favorites = Favorites.objects.filter(user=user)
        serializer = FavoritesSerializer(favorites, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Create a new favorite or return existing one to avoid duplicates.
        """
        user = request.user.profile
        dog = get_object_or_404(Dog, pk=request.data['dog'])
        favorite, created = Favorites.objects.get_or_create(user=user, dog=dog)
        if not created:
            favorite.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(FavoritesSerializer(favorite).data, status=status.HTTP_201_CREATED)


class FavoriteDetail(APIView):
    """
    A view for displaying a single favorite dog.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """
        Retrieve a single favorite dog.
        """
        user = request.user.profile
        favorite = get_object_or_404(Favorites, user=user, dog=pk)
        serializer = FavoritesSerializer(favorite)
        return Response(serializer.data)

    def delete(self, request, pk):
        """
        Delete a favorite dog.
        """
        user = request.user.profile
        favorite = get_object_or_404(Favorites, user=user, dog=pk)
        favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
