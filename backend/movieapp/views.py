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

    def post(self, request, *args, **kwargs):
        user = request.user
        watchlist_id = request.data.get("watchlist_id")
      
        try:
            
            watchlist = Watchlist.objects.get(user=user, id=watchlist_id)
            print(watchlist)
            
        except Watchlist.DoesNotExist:
            return Response({"detail": "Watchlist not found."}, status=status.HTTP_404_NOT_FOUND)
        new_dict=request.data
        new_dict['user']=user.id
        serializer = AddmovieSerializer(data=new_dict)
        if serializer.is_valid():

            movie = serializer.save(user=user)
            print(watchlist.objects.get(id=watchlist_id))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WatchlistDetailView(APIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]
    

    def get(self, request, *args, **kwargs):
        user = self.request.user
        watchlist = Watchlist.objects.filter(user=user.id)
        print(watchlist)

        if watchlist:
            serializer = WatchlistSerializer(watchlist, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Watchlist not found."}, status=404)
    def post(self, request, *args, **kwargs):
        user = request.user
        watchlist = Watchlist.objects.create(user=user)
        serializer = WatchlistSerializer(watchlist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)