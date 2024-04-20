from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product ,Order,OrderItem,ShippingAddress
from base.serializers import ProductSerializer,UserSerializer,MyTokenObtainPairSerializer,UserSerializerWithToken,OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from  django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user= request.user
    data= request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems)==0:
        return Response({'details':'NO OrderItems'},status=status.HTTP_400_BAD_REQUEST)
    else:
        #(1)create a new order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice= data['TaxPrice'],
            shippingPrice=data['ShippingPrice'],
            totalPrice=data['ToatalPrice'],
        )
        #(2)create Shipping Address
        shipping=ShippingAddress.objects.create(
            order= order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalcode'],
            country=data['shippingAddress']['country'],
        )
        #(3)create Order items adn set order to orderitem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item=OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            #(4)Update orders
            product.countInStock -= item.qty
            product.save()
        serializer=OrderSerializer(order,many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try :
        order = Order.objects.get(_id=pk)
        print('order',order)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'detail ':'Not authorized Bhai'},status =status.HTTP_400_BAD_REQUEST)

    except  :
        return Response({'detail':'Order does not exists'},status =status.HTTP_400_BAD_REQUEST)

    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateorderToPaid(request,pk):
    order =Order.objects.get(_id=pk)
    order.ispaid =True
    order.paidAt = datetime.now()
    order.save()
    return Response('order was Paid')
