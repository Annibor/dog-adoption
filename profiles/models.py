from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save


# Create your models here.
class Profile(models.Model):
  """
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
    verbose_name = "Profile"
    verbose_name_plural = "Profiles"

  def __str__(self):
    return f"{self.owner}'s profile"

