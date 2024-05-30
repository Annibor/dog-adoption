from django.urls import path
from profiles import views


urlpatterns = [
  path('profiles/', views.ProfileList.as_view()),
  path('profile/<int:pk>/',
       views.ProfileDetail.as_view(), name='profile-detail'),
]
