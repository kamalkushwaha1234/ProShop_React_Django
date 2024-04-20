#products_urls.py
from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProduct, name="product"),
    path('<str:pk>', views.getProducts, name="products"),

    
]