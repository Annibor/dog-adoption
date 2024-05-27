from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from .models import Profile


class TestProfileListViews(TestCase):
  """
  Test case for testing profile list views.
  """

  def setUp(self):
    """
    Set up the test environment.
    """
    self.user = User.objects.create_user(username='testuser', password='12345')
    self.client.login(username='testuser', password='12345')

  def test_can_list_profiles(self):
    """
    Test if profiles can be listed successfully.
    """
    response = self.client.get('/profiles/')
    self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProfileDetailViews(TestCase):
  """
  Tests for the profile detail views.
  """

  def setUp(self):
    """
    Set up the test case by creating a user, logging in, and setting up the profile URL.
    """
    self.user = User.objects.create_user(username='testuser', password='12345')
    self.client.login(username='testuser', password='12345')
    self.profile = Profile.objects.get(owner=self.user)
    self.url = f'/profile/{self.profile.id}/'

  def test_can_retrieve_profile(self):
    """
    Test that the profile can be retrieved successfully.
    """
    response = self.client.get(self.url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['first_name'], self.profile.first_name)
    self.assertEqual(response.data['last_name'], self.profile.last_name)

  def test_can_update_profile(self):
    """
    Test that the profile can be updated successfully.
    """
    data = {
      'first_name': 'FirstName',
      'last_name': 'LastName'
    }
    response = self.client.put(self.url, data, content_type='application/json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.profile.refresh_from_db()
    self.assertEqual(self.profile.first_name, 'FirstName')
    self.assertEqual(self.profile.last_name, 'LastName')
