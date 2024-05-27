from django.test import TestCase
from django.contrib.auth.models import User
from .models import AdoptionEvent, AdoptionEventRegistration

# Create your tests here.
class TestProfileModel(TestCase):
  """
  Test case for the Profile model.
  """

  def setUp(self):
    """
    Set up the test data.
    """
    self.event = AdoptionEvent.objects.create(
      title="Test Event",
      description="This is a test event",
      date="2021-07-04 12:00:00",
      location="Test Location"
    )

  def test_adoption_event_create(self):
    """
    Test the creation of an AdoptionEvent.
    """
    self.assertEqual(self.event.title, "Test Event")
    self.assertEqual(self.event.description, "This is a test event")
    self.assertEqual(self.event.date, "2021-07-04 12:00:00")
    self.assertEqual(self.event.location, "Test Location")
    self.assertEqual(str(self.event), "Test Event")


class TestAdoptionEventRegistrationModel(TestCase):
  """
  Test for the AdoptionEventRegistration model.
  """

  def setUp(self):
    """
    Set up the necessary objects for the tests.
    """
    self.user = User.objects.create_user(username='testuser', password='12345')
    self.event = AdoptionEvent.objects.create(
      title="Test Event Create",
      descripton="This is a test event",
      date="2021-07-04 12:00:00",
      location="Test Location"
    )
    self.registration = AdoptionEventRegistration.objects.create(
      event=self.event,
      user=self.user
    )

  def test_adoption_event_registration_create(self):
    """
    Test the creation of an AdoptionEventRegistration.
    """
    self.assertEqual(self.registration.event, self.event)
    self.assertEqual(self.registration.user, self.profile)
    self.assertEqual(str(self.registration), f"{self.user} registered for {self.event}")

  