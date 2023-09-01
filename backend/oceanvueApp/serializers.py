from djoser.serializers import UserCreateSerializer

# from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ( 'id' , 'name' , 'email' , 'password')