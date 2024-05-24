from django.urls import path
from favorites import views

urlpatterns = [
  path("favorites/", views.FavoritesView.as_view()),
]