from django.urls import path
from .views import AdoptionEventList, AdoptionEventDetail, EventRegistration, EventRegistration

urlpatterns = [
    path('events/', AdoptionEventList.as_view(), name='event-list'),
    path('events/<int:pk>/', AdoptionEventDetail.as_view(), name='event-detail'),
    path('events/<int:event_pk>/registrations/', EventRegistration.as_view(), name='registration-list'),
    path('events/registrations/<int:pk>/', EventRegistration.as_view(), name='registration-detail'),
]