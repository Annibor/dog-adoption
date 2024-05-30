from django.db import models
from cloudinary.models import CloudinaryField
from profiles.models import Profile
from django.utils import timezone

# Create your models here.


class Dog(models.Model):
    """
    Represents a dog available for adoption.

    Attributes:
    name (CharField): The dog's name.
    breed (CharField): The dog's breed.
    age (IntegerField): The dog's age in years.
    featured_image (CloudinaryField): An image of the dog,
    stored externally via Cloudinary.
    description (TextField): A detailed description of the dog.
    gender (CharField): The gender of the dog.
    good_with_children (BooleanField): True
    if the dog is known to be good with children, False otherwise.
    good_with_other_dogs (BooleanField): True
    if the dog is known to be good with other dogs, False otherwise.
    adoption_status (CharField): The current
    adoption status of the dog, with choices of 'available',
    'pending', or 'adopted'.
    """
    TEMPERAMENT_CHOICES = [
        ('calm', 'Calm'),
        ('energetic', 'Energetic'),
        ('aggressive', 'Aggressive'),
    ]

    name = models.CharField(max_length=80)
    breed = models.CharField(max_length=80)
    age = models.IntegerField()
    featured_image = CloudinaryField('image', default='placeholder')
    description = models.TextField()
    gender = models.CharField(max_length=10)
    temperament = models.CharField(max_length=10,
                                   choices=TEMPERAMENT_CHOICES, default='calm')
    good_with_children = models.BooleanField(default=True)
    good_with_other_dogs = models.BooleanField(default=True)
    adoption_status = models.CharField(max_length=20,
                                       choices=[('available', 'Available'),
                                                ('pending',   'Pending'),
                                                ('adopted', 'Adopted')],
                                       default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """
        Metadata for the Dog model.
        """
        verbose_name = "Dog"
        verbose_name_plural = "Dogs"
        ordering = ["name"]

    def __str__(self):
        return self.name


class AdoptionApplication(models.Model):
    """
    Application for adopting a dog.

    Attributes:
      user (ForeignKey): The user applying to adopt the dog.
      dog (ForeignKey): The dog being applied for.
      visit_date (DateTimeField):
      The date and time the user plans to visit the dog.
      status (CharField):
      The status of the application, with choices of
      'pending', 'approved', or 'rejected'.
      created_at (DateTimeField):
      The date and time the application was created.
      updated_at (DateTimeField):
      The date and time the application was last updated.
    """
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    dog = models.ForeignKey(Dog, on_delete=models.CASCADE)
    visit_date = models.DateTimeField()
    status = models.CharField(
      max_length=20, choices=[
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
        ], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """
        Metadata for the AdoptionApplicationModel model.
        """
        verbose_name = "Adoption Application"
        verbose_name_plural = "Adoption Applications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user}'s application for {self.dog}."