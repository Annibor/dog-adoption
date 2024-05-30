from django.contrib import admin
from .models import AdoptionEvent, AdoptionEventRegistration


# Register your models here.
admin.site.register(AdoptionEvent)
admin.site.register(AdoptionEventRegistration)
