from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers


class CurrentProfileSerializer(UserDetailsSerializer):
    profile_id = serializers.ReadOnlyField(source='profile.id')

    class Meta(UserDetailsSerializer.Meta):
        fields = (
            'profile_id',
        )
