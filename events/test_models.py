from django.test import TestCase
from django.contrib.auth.models import User
from .models import AdoptionEvent, AdoptionEventRegistration
from profiles.models import Profile

# Create your tests here.
class TestAdoptionEventModel(TestCase):
  """
  Test case for the AdoptionEvent model.
  """
  def setUp(self):
    self.event = AdoptionEvent.objects.create(
      title='Test Event',
      description='This is a test event',
      date='2024-07-04',
      location='Test Location'
    )

  def test_adoption_event_create(self):
    """
    Test ctreat an event.
    """
    self.assertEqual(self.event.title, 'Test Event')
    self.assertEqual(self.event.description, 'This is a test event')
    self.assertEqual(self.event.date, '2024-07-04')
    self.assertEqual(self.event.location, 'Test Location')


class TestAdoptionEventRegistrationModel(TestCase):
  """
  Test case for the AdoptionEventRegistration model.
  """
  def setUp(self):
    self.user = User.objects.create_user(username='testuser', password='12345')
    self.profile, created = Profile.objects.get_or_create(owner=self.user)
    self.event = AdoptionEvent.objects.create(
      title='Test Event',
      description='This is a test event',
      date='2024-07-04',
      location='Test Location'
    )
    self.registration = AdoptionEventRegistration.objects.create(
      event=self.event,
      user=self.profile
    )

  def test_adoption_event_registration_create(self):
    """
    Test create an event registration.
    """
    self.assertEqual(self.registration.event, self.event)
    self.assertEqual(self.registration.user, self.profile)
    self.assertEqual(str(self.registration), f'{self.profile} registered for {self.event}')