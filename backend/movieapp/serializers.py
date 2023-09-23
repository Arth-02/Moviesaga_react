from rest_framework import serializers
from rest_framework.fields import empty
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
        fields = ['id','timestamp','movies','name']
    def get_movies(self, obj):
        movies = Addmovie.objects.filter(watchlistid=obj)
        return AddmovieSerializer(movies, many=True).data    
    
class RatingSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Rating
        fields = ['id','movie_id','title','poster_path','release_date','rating','timestamp','username']
    def get_username(self, obj):
        user = CustomUser.objects.get(id=obj.user.id)
        return user.username

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    replies_count=serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
        
    class Meta:
        model = Review
        fields = ['id','movie_id','title','poster_path','release_date','review','timestamp','username','replies_count','rating']
    def get_username(self, obj):
        user = CustomUser.objects.get(id=obj.user.id)
        return user.username
    def get_replies_count(self, obj):
        replies = ReviewReply.objects.filter(review=obj.id)
        return len(replies)
    def get_rating(self, obj):
        rating = Rating.objects.filter(movie_id=obj.movie_id,user=obj.user.id)
        if len(rating)>0:
            return rating[0].rating
        else:
            return 0
    def update(self, instance, validated_data):
        rating_data = self.context['request'].data.get('rating', None)

        print(rating_data)
        if rating_data is not None:
            rating = Rating.objects.filter(movie_id=instance.movie_id,user=instance.user.id)
            if len(rating)>0:
                rating[0].rating = rating_data
                rating[0].save()
            else:
                Rating.objects.create(movie_id=instance.movie_id,user=instance.user,rating=rating_data)
        return super().update(instance, validated_data)
    
class ReviewReplySerializer(serializers.ModelSerializer):
    def __init__(self, instance=None, data=..., **kwargs):
        super().__init__(instance, data, **kwargs)
        if self.context['request'].method == 'GET':
            self.fields['username'] = serializers.SerializerMethodField()
    class Meta:
        model = ReviewReply
        fields = ['id','review','reply','timestamp']
    def get_username(self, obj):
        user = CustomUser.objects.get(id=obj.user.id)
        return user.username
    
