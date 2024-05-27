from django.test import TestCase
from django.contrib.auth.models import User
from .models import AdoptionEvent, AdoptionEventRegistration

# Create your tests here.
class TestProfileModel(TestCase):

  def setUp(self):
    self.event = AdoptionEvent.objects.create(
      title="Test Event",
      descripton="This is a test event",
      date="2021-07-04 12:00:00",
      location="Test Location"
    )

  
  def test_adoption_event_create(self):
    self.assertEqual(self.event.title, "Test Event")
    self.assertEqual(self.event.description, "This is a test event")
    self.assertEqual(self.event.date, "2021-07-04 12:00:00")
    self.assertEqual(self.event.location, "Test Location")
    self.assertEqual(str(self.event), "Test Event")
