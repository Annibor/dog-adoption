from rest_framework.test import APITestCase
from django.urls import reverse
from .models import AdoptionEvent, AdoptionEventRegistration
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User 

class TestAdoptionEventListViews(APITestCase):
  """
  Test case for the AdoptionEvent list views.
  """

  def setUp(self):
    
    self.event1 = AdoptionEvent.objects.create(
      title='Test Event',
      description='This is a test event',
      date='2024-07-04',
      location='Test Location'
    )
    self.event2 = AdoptionEvent.objects.create(
      title='Test Event 2',
      description='This is another test event',
      date='2024-07-04',
      location='Test Location 2'
    )

  def test_event_list(self):
    """
    Test the event list.
    """
    url = reverse('event-list')
    response = self.client.get(url)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(response.data), 2)
    self.assertEqual(response.data[0]['title'], 'Test Event 2')
    self.assertEqual(response.data[1]['title'], 'Test Event')

  
class TestAdoptionEventDetailViews(APITestCase):
  """
  Test case for the AdoptionEvent detail views.
  """

  def setUp(self):
   
    self.authenticated_client = APIClient()
    self.user = User.objects.create_user(username='testuser', password='12345')
    self.authenticated_client.force_authenticate(user=self.user)
    self.event1 = AdoptionEvent.objects.create(
      title='Test Event',
      description='This is a test event',
      date='2024-07-04',
      location='Test Location'
    )
    self.event2 = AdoptionEvent.objects.create(
      title='Test Event 2',
      description='This is another test event',
      date='2024-07-04',
      location='Test Location 2'
    )

  def test_event_detail(self):
    """
    Test the event detail view for an authenticated user.
    """
    self.client.force_authenticate(user=self.user)
    url = reverse('event-detail', kwargs={'pk': self.event1.pk})
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['title'], 'Test Event')

  def test_event_detail_unauthenticated(self):
    """
    Test the event detail view for an unauthenticated user.
    """
    url = reverse('event-detail', kwargs={'pk': self.event1.pk})
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestEventRegistrationViews(APITestCase):
  def setUp(self):
    self.authenticated_client = APIClient()
    self.user = User.objects.create_user(username='testuser', password='12345')
    self.authenticated_client.force_authenticate(user=self.user)
    self.event1 = AdoptionEvent.objects.create(
      title='Test Event',
      description='This is a test event',
      date='2024-07-04',
      location='Test Location'
    )

  def test_event_registration(self):
    url = reverse('event-detail', kwargs={'pk': self.event1.pk})
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertTrue(AdoptionEventRegistration.objects.filter(event=self.event, user=self.profile).exists())
