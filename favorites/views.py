from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Favorites
from dogs.models import Dog
from .serializers import FavoritesSerializer
from rest_framework import status

# Create your views here.
class FavoritesView(APIView):
  """
  A view for displaying a user's favorite dogs.
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
  
