#user_views.py

from django.shortcuts import render
from django.http import JsonResponse
from base.products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product
from base.serializers import ProductSerializer,UserSerializer,MyTokenObtainPairSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from  django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer): 
    def validate(self, attrs):
        data = super().validate(attrs)
        # Add custom claims to the response data
        serializer =UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]= v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try : 
        user =User.objects.create(
        first_name=data['name'],
        username=data['email'],
        email=data['email'],
        password=make_password(data['password']))
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)

    except :
        message={'detail':'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user =request.user
    serializer=UserSerializerWithToken(user)

    data = request.data

    user.first_name=data['name']
    user.username=data['email']
    user.email=data['email']
    if 'password' in data and data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    for field in user._meta.fields:
        print(f"{field.name}: {getattr(user, field.name)}")

    print(data)

    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user =request.user
    serializer=UserSerializer(user)
    return Response(serializer.data)
    
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)