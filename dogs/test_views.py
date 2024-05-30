from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Dog
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class TestDogViews(APITestCase):

    def setUp(self):
        self.dog1 = Dog.objects.create(
            name='Hubbe',
            breed='Golden Retriever',
            age=5,
            featured_image='https://example.com/image.jpg',
            description='Funny dog',
            gender='male',
            good_with_children=True,
            good_with_other_dogs=True,
            adoption_status='available'
        )
        self.dog2 = Dog.objects.create(
            name='Hejsan',
            breed='Bulldog',
            age=5,
            featured_image='https://example.com/image.jpg',
            description='Caring dog',
            gender='female',
            good_with_children=True,
            good_with_other_dogs=True,
            adoption_status='available'
        )

    def test_dog_list(self):
        url = reverse('dogs-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Hejsan')
        self.assertEqual(response.data[1]['name'], 'Hubbe')

    def test_filter_dogs_by_breed(self):
        response = self.client.get(reverse('dogs-list'),
                                   {'breed': 'Golden Retriever'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Hubbe')

    def test_search_dogs_by_gender(self):
        response = self.client.get(reverse('dogs-list'),
                                   {'gender': 'female'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Hejsan')


class TestDogDetailViews(APITestCase):
    """
    Test the dog detail view.
    """
    def setUp(self):
        self.authenticated_client = APIClient()
        self.user = User.objects.create_user(username='testuser',
                                             password='12345')
        self.authenticated_client.force_authenticate(user=self.user)
        self.dog1 = Dog.objects.create(
          name='Hubbe',
          breed='Golden Retriever',
          age=5,
          featured_image='https://example.com/image.jpg',
          description='Funny dog',
          gender='male',
          good_with_children=True,
          good_with_other_dogs=True,
          adoption_status='available'
        )
        self.dog2 = Dog.objects.create(
          name='Hejsan',
          breed='Bulldog',
          age=5,
          featured_image='https://example.com/image.jpg',
          description='Caring dog',
          gender='female',
          good_with_children=True,
          good_with_other_dogs=True,
          adoption_status='available'
        )

    def test_can_view_dog_detail(self):
        """
        Test that detailed dog information can be viewed by
        authenticated users.
        """
        self.client.force_authenticate(user=self.user)
        url = reverse('dog-detail', kwargs={'pk': self.dog1.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Hubbe')

    def test_cant_view_dog_detail_unauthenticated(self):
        """
        Test that unauthenticated users cannot view detailed dog information.
        """
        url = reverse('dog-detail', kwargs={'pk': self.dog1.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
