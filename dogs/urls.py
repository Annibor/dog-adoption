from django.urls import path
from dogs import views

urlpatterns = [
  path("dogs/", views.DogListView.as_view(), name='dogs-list'),
  path('dogs/<int:pk>/', views.DogDetailView.as_view(), name='dog-detail'),
  path("adoption-applications/", views.AdoptionApplicationListCreatView.as_view()),
  path("adoption-applications/<int:pk>/", views.AdoptionApplicationDetailView.as_view()),
]