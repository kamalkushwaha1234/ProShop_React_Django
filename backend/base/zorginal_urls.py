#base_app urls.py
from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', views.getUsers, name="users"),
    path('users/register/',views.registerUser, name="register"),
    
    path('product/', views.getProduct, name="product"),
    path('products/<str:pk>', views.getProducts, name="products"),
    path('users/profile/', views.getUserProfile, name="users-profile"),
    
]
