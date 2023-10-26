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
    # Check if the movie already exists
        if Addmovie.objects.filter(user=user, movie_id=self.request.data['movie_id']):
            print("Already Added")
            return Response({'message': 'Movie already added.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save(user=user)
    

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
    
class RatingView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    filterset_fields = ['movie_id']
    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        else:
            return [IsAuthenticated()]
    
    def perform_create(self, serializer):
        user=CustomUser.objects.get(id=self.request.user.id)
        serializer.save(user=user)
    
    

class RatingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    filterset_fields = ['movie_id']

    
    
class ReviewView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filterset_fields = ['movie_id']

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        else:
            return [IsAuthenticated()]
    
    def perform_create(self, serializer):
        user=CustomUser.objects.get(id=self.request.user.id)
        serializer.save(user=user)

class ReviewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):

        return Review.objects.filter(user=self.request.user)

class ReviewReplyView(generics.ListCreateAPIView):
    queryset = ReviewReply.objects.all()
    serializer_class = ReviewReplySerializer
    filterset_fields = ['movie_id']

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        else:
            return [IsAuthenticated()]
    
    def perform_create(self, serializer):
        user=CustomUser.objects.get(id=self.request.user.id)
        serializer.save(user=user)

class ReviewReplyRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewReplySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ReviewReply.objects.filter(user=self.request.user)
    
class UserRatingView(generics.ListAPIView):
    serializer_class=RatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.GET.get('movie_id'):
            return Rating.objects.filter(user=self.request.user, movie_id=self.request.GET.get('movie_id'))
        return Rating.objects.filter(user=self.request.user)

class UserReviewView(generics.ListAPIView):
    serializer_class=ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.GET.get('movie_id'):
            return Review.objects.filter(user=self.request.user, movie_id=self.request.GET.get('movie_id'))
        return Review.objects.filter(user=self.request.user)
