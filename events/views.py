from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import AdoptionEvent, AdoptionEventRegistration
from .serializers import AdoptionEventSerializer
from .serializers import AdoptionEventRegistrationSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class AdoptionEventList(generics.ListCreateAPIView):
    """
    A view for listing and creating AdoptionEvent objects.
    Only admins can create AdoptionEvent objects.
    """
    queryset = AdoptionEvent.objects.all().order_by('-created_at')
    serializer_class = AdoptionEventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()


class AdoptionEventDetail(generics.RetrieveAPIView):
    """
    A view for retrievinga single AdoptionEvent object.
    """
    queryset = AdoptionEvent.objects.all()
    serializer_class = AdoptionEventSerializer


class UserEventRegistrations(APIView):
    """
    View to list all event registrations for the current user.
    """
    serializer_class = AdoptionEventRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        registrations = (AdoptionEventRegistration.
                         objects.filter(user=request.user.profile))
        serializer = (AdoptionEventRegistrationSerializer
                      (registrations, many=True))
        return Response(serializer.data)


class EventRegistrationListCreateDelete(APIView):
    """
    View for listing, creating, and deleting event registrations.
    """
    serializer_class = AdoptionEventRegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        registrations = (AdoptionEventRegistration.
                         objects.filter(user=request.user.profile,
                                        event_id=pk))
        serializer = (AdoptionEventRegistrationSerializer
                      (registrations, many=True, context={"request": request}))
        return Response(serializer.data)

    def post(self, request, pk):
        event = get_object_or_404(AdoptionEvent, pk=pk)
        if AdoptionEventRegistration.objects.filter(event=event,
                                                    user=request.
                                                    user.profile).exists():
            return Response({"detail":
                             "You have already registered for this event."},
                            status=status.HTTP_400_BAD_REQUEST)
        serializer = AdoptionEventRegistrationSerializer(data=request.data,
                                                         context={"request":
                                                                  request})
        if serializer.is_valid():
            serializer.save(user=request.user.profile, event=event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        registration = get_object_or_404(AdoptionEventRegistration, pk=pk)
        self.check_object_permissions(request, registration)
        registration.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
