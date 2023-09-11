from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Group, Permission, BaseUserManager
from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255,unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)


    # groups and user_permissions are included here for the sake of completeness,
    groups = models.ManyToManyField(Group, related_name='custom_users')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_users')

    objects = CustomUserManager()
    USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = ['username']
    

    def __str__(self):
        return self.email
    

class Watchlist(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='watchlists')
    timestamp = models.DateTimeField(default=timezone.now)
    name= models.CharField(max_length=255)
    
    def __str__(self):
        return f"Watchlist for {self.user.username}"
    
class Addmovie(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='addmovie')
    movie_id = models.IntegerField()
    title = models.CharField(max_length=255)
    poster_path = models.CharField(max_length=255)
    release_date = models.DateField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    timestamp = models.DateTimeField(default=timezone.now)
    watchlistid = models.ForeignKey(Watchlist, related_name='addmovies', on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.title} of watchlist {self.watchlistid}"
    

