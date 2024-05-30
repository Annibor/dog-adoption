from django.test import TestCase
from django.contrib.auth.models import User
from .models import Favorites
from profiles.models import Profile
from dogs.models import Dog


class TestFavoritesModel(TestCase):
    """
    Test for the Favorites model.
    """
    def setUp(self):
        self.user = User.objects.create_user(username='testuser',
                                             password='12345')
        self.profile, created = Profile.objects.get_or_create(owner=self.user)
        self.dog = Dog.objects.create(
          name='Test Dog',
          breed='Test Breed',
          age=3
        )

    def test_favorites_model(self):
        """
        Test that the Favorites model can be created.
        """
        favorite = Favorites.objects.create(
          user=self.profile,
          dog=self.dog
        )
        self.assertEqual(favorite.user, self.profile)
        self.assertEqual(favorite.dog, self.dog)
        self.assertTrue(favorite.created_at)
        self.assertEqual(str(favorite),
                         f"{self.profile}'s favorite {self.dog.name}")
