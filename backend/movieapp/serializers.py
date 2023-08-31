from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'username')
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)
        instance.save()
        return instance

class UserLoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        if isinstance(user, CustomUser):
            token['username'] = user.username
            token['user_id'] = user.id

        return token    
    
class AddmovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addmovie
        fields = '__all__'

class WatchlistSerializer(serializers.ModelSerializer):
    movies = AddmovieSerializer(many=True, read_only=True)
    class Meta:
        model = Watchlist
        fields = '__all__'