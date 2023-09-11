from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import *
from rest_framework.views import APIView
class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer


    
class AddMovieToWatchlistView(generics.CreateAPIView):
    serializer_class = AddmovieSerializer
    permission_classes = [IsAuthenticated]



    def perform_create(self, serializer):
        user = CustomUser.objects.get(id=self.request.user.id)
        print(Addmovie.objects.filter(user=user, movie_id=self.request.data['movie_id']))
    # Check if the movie already exists
        if Addmovie.objects.filter(user=user, movie_id=self.request.data['movie_id']):
            return Response({'message': 'Movie already added.'}, status=status.HTTP_400_BAD_REQUEST)
    

class MovieDelete(generics.DestroyAPIView):
    serializer_class = AddmovieSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Addmovie.objects.filter(user=self.request.user)

class WatchlistDetailView(generics.ListCreateAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]
    

    def perform_create(self, serializer):
        user=CustomUser.objects.get(id=self.request.user.id)
        serializer.save(user=user)
    
    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)
    
class WacthlistDelete(generics.DestroyAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)