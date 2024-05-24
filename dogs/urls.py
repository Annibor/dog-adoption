from django.urls import path
from dogs import views

urlpatterns = [
  path("dogs/", views.DogListView.as_view()),
  path('dogs/<int:pk>/', views.DogDetailView.as_view(), name='dog-detail'),
]