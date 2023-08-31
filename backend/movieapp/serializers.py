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
        fields = ['id','movie_id','title','poster_path','release_date','rating','timestamp','watchlistid']
        

class WatchlistSerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    class Meta:
        model = Watchlist
        fields = ['id','timestamp','movies']
    def get_movies(self, obj):
        movies = Addmovie.objects.filter(watchlistid=obj)
        return AddmovieSerializer(movies, many=True).data    
