from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import *

urlpatterns = [
    # ...
    path('api/users/register/', UserRegistrationView.as_view(), name='user_register'),
    path('api/users/token/', UserLoginView.as_view(), name='user_token'),
    path('add-movie/', AddMovieToWatchlistView.as_view(), name='add-movie'),
    path('watchlist/', WatchlistDetailView.as_view(), name='watchlist-detail'),
    
]