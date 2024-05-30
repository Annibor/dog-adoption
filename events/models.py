from django.db import models
from profiles.models import Profile

# Create your models here.


class AdoptionEvent(models.Model):
    """
    Represents an adoption event.

    Attributes:
      title (str): The title of the adoption event.
      description (str): The description of the adoption event.
      date (datetime): The date and time of the adoption event.
      location (str): The location of the adoption event.
      created_at (datetime): The date and time when the adoption
      event was created.
    """

    title = models.CharField(max_length=225)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=225)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
        Meta data for AdoptionEvent model.
        """
        verbose_name = "Adoption Event"
        verbose_name_plural = "Adoption Events"
        ordering = ['title', 'description', '-date']

    def __str__(self):
        return self.title


class AdoptionEventRegistration(models.Model):
    """
    Represents a user's registration for an adoption event.

    Attributes:
      event (ForeignKey): The adoption event the user is registering for.
      user (ForeignKey): The user who is registering for the event.
      created_at (DateTime): The date and time the registration was created.
    """
    event = models.ForeignKey(AdoptionEvent, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
        Metadata for the AdoptionEventRegistration model.
        """
        verbose_name = "Adoption Event Registration"
        verbose_name_plural = "Adoption Event Registrations"
        ordering = ['event', 'user']

    def __str__(self):
        return f"{self.user} registered for {self.event}"
