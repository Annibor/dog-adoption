from django.urls import path
from .views import AdoptionEventList, AdoptionEventDetail
from .views import EventRegistrationListCreateDelete
from .views import UserEventRegistrations

urlpatterns = [
     path('events/', AdoptionEventList.as_view(), name='event-list'),
     path('events/<int:pk>/', AdoptionEventDetail.as_view(),
         name='event-detail'),
     path('events/registrations/',
          UserEventRegistrations.as_view(), name='events-registation'),
     path('events/registrations/<int:pk>/',
         EventRegistrationListCreateDelete.as_view(),
         name='registration-list'),
]
