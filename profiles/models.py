from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


# Create your models here.
class Profile(models.Model):
    """
    Represents a user profile that extends the default
    Django User model by adding
    additional fields to it.

    Attributes:
      owner (User): A one-to-one relationship linking
      back to Django's User model.
      username (str): Username for the user,
      derived from the User model.
      first_name (str): First name of the user.
      last_name (str): Last name of the user.
      email (EmailField): Email address of the user.
      phone (CharField): Contact phone number of the user.
      address (CharField): Home address of the user.
      city (CharField): City part of the user's address.
      state (CharField): State part of the user's address.
      zip_code (CharField): Postal code part of
      the user's address.
      has_other_pets (BooleanField): Indicates whether
      the user has other pets.
      has_children (BooleanField): Indicates whether
      the user has children.
    """
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=50, blank=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=70)
    email = models.EmailField(max_length=50, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=220, blank=True)
    city = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    has_other_pets = models.BooleanField(default=False)
    has_children = models.BooleanField(default=False)

    class Meta:
        """
        Metadata options for the Profile model.

        Attributes:
          verbose_name (str): The human-readable name
          for a single instance of the model.
          verbose_name_plural (str): The human-readable
          name for multiple instances of the model.
        """
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

    def __str__(self):
        return f"{self.owner}'s profile"


def create_profile(sender, instance, created, **kwargs):
    """
    Creates a Profile for a new User.
    """
    if created:
        Profile.objects.create(owner=instance, username=instance.username)


post_save.connect(create_profile, sender=User)
