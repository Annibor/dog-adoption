from django.urls import path
from dogs import views

urlpatterns = [
  path("dogs/", views.DogListView.as_view()),
  path('dogs/<int:pk>/', views.DogDetailView.as_view(), name='dog-detail'),
  path
  path("adoption-applications/", views.AdoptionApplicationListCreateView.as_view()),
  path("adoption-applications/<int:pk>/", views.AdoptionApplicationDetailView.as_view()),
]