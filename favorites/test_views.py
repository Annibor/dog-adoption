from django.test import TestCase
from dogs.models import Dog
from profiles.models import Profile
from .models import Favorites
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status


class TestFavoritesView(TestCase):

  def setUp(self):
    self.client = APIClient()
    self.user = User.objects.create_user(username='testuser', password='12345')
    self.profile = Profile.objects.get(owner=self.user)
    self.client.force_authenticate(user=self.user)
    self.dog1 = Dog.objects.create(
      name='Hubbe',
      breed='Golden Retriever',
      age=5,
    )
    self.dog2 = Dog.objects.create(
      name='Hejsan',
      breed='Bulldog',
      age=3,
    )

  def test_can_list_favorites(self):
    """
    Test to verify that the favorites can be listed successfully.
    """
    response = self.client.get('/favorites/')
    Favorites.objects.create(user=self.profile, dog=self.dog1)
    Favorites.objects.create(user=self.profile, dog=self.dog2)
    self.assertEqual(response.status_code, status.HTTP_200_OK)

  def test_logged_in_user_can_add_dog_to_favorites(self):
    """
    Test to verify that a logged in user can add a dog to their favorites.
    """
    self.client.login(username='testuser', password='12345')
    response = self.client.post('/favorites/', {'dog': self.dog2.id})
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertTrue(Favorites.objects.filter(user=self.profile, dog=self.dog2).exists())