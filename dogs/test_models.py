from django.test import TestCase
from django.contrib.auth.models import User
from .models import Dog, AdoptionApplication

# Create your tests here.
class TestDogModel(TestCase):
  """
  Test for testing the Dog model.
  """

  def setUp(self):
    """
    Set up the test environment by creating a Dog.
    """
    self.dog = Dog.objects.create(
      name='Buddy',
      breed='Golden Retriever',
      age=3,
      featured_image='https://example.com/image.jpg',
      description='Friendly dog',
      gender='Male',
      temperament='calm',
      good_with_children=True,
      good_with_other_dogs=True,
      adoption_status='available'
    )

  def test_dog_created(self):
    """
    Test so the dog is created successfully.
    """
    self.assertEqual(self.dog.name, 'Buddy')
    self.assertEqual(self.dog.breed, 'Golden Retriever')
    self.assertEqual(self.dog.age, 3)
    self.assertEqual(self.dog.featured_image, 'https://example.com/image.jpg')
    self.assertEqual(self.dog.description, 'Friendly dog')
    self.assertEqual(self.dog.gender, 'Male')
    self.assertEqual(self.dog.temperament, 'calm')
    self.assertTrue(self.dog.good_with_children)
    self.assertTrue(self.dog.good_with_other_dogs)
    self.assertEqual(self.dog.adoption_status, 'available')




  