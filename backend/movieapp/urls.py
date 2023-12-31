from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import *

urlpatterns = [
    # ...
    path('api/users/register/', UserRegistrationView.as_view(), name='user_register'),
    path('api/users/token/', UserLoginView.as_view(), name='user_token'),
    path('api/users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('add-movie/', AddMovieToWatchlistView.as_view(), name='add-movie'),
    path('delete-movie/<int:pk>/', MovieDelete.as_view(), name='delete-movie'),
    path('watchlist/', WatchlistDetailView.as_view(), name='watchlist-detail'),
    path('watchlist/<int:pk>/', WacthlistDelete.as_view(), name='watchlist-delete'),
    path('rating/', RatingView.as_view(), name='rating'),
    path('rating/<int:pk>/', RatingRetrieveUpdateDestroy.as_view(), name='rating-update'),
    path('review/', ReviewView.as_view(), name='review'),
    path('review/<int:pk>/', ReviewRetrieveUpdateDestroy.as_view(), name='review-update'),
    path('review-reply/', ReviewReplyView.as_view(), name='review-reply'),
    path('review-reply/<int:pk>/', ReviewReplyRetrieveUpdateDestroy.as_view(), name='review-reply-update'),
    path('userrating/', UserRatingView.as_view(), name='user-rating'),
    path('userreview/', UserReviewView.as_view(), name='user-review'),

]