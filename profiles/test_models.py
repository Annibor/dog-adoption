from django.test import TestCase
from django.contrib.auth.models import User
from .models import Profile

# Create your tests here.
class TestProfileModel(TestCase):

  def setUp(self):
    self.user = User.objects.create_user(username='testuser', password='12345')

  def test_profile_created(self):
    profile = Profile.objects.get(owner=self.user)
    self.assertEqual(profile.username, 'testuser')