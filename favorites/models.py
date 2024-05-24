from django.db import models
from dogs.models import Dog
from profiles.models import Profile

# Create your models here.
class Save(models.Model):
  """
  Represents a user's favorite dog.
  
  Attributes:
    user (ForeignKey): The user who favorited the dog.
    dog (ForeignKey): The dog that was favorited.
    created_at (DateTime): The date and time the dog was added to favorites.
    """
  user = models.ForeignKey(Profile, on_delete=models.CASCADE)
  dog = models.ForeignKey(Dog, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  
  class Meta:
    """
    Metadata for the Save model.
    """
    verbose_name = "Save"
    verbose_name_plural = "Saves"
    unique_together = ['user', 'dog']
    
  def __str__(self):
    return f"{self.user} saved {self.dog}"