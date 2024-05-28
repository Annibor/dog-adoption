from rest_framework.test import APITestCase
from django.urls import reverse
from .models import AdoptionEvent, AdoptionEventRegistration


class TestAdoptionEventListViews(APITestCase):

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
    url = reverse('event-list')
    response = self.client.get(url)
    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(response.data), 2)
    self.assertEqual(response.data[0]['title'], 'Test Event 2')
    self.assertEqual(response.data[1]['title'], 'Test Event')