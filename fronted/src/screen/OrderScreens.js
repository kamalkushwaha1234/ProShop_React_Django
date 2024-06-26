import React,{useState,useEffect} from 'react'
import { Link, redirect,useParams, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button,Row,Col ,ListGroup,Image,Card} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import CheckoutStep from '../components/CheckoutStep'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import { getOrderDetails } from '../actions/orderActions'


function OrderScreens() {
    const {id}=useParams()
    console.log('OrderScreens from orderId: ',id)

    const history=useNavigate()

    const orderDetails= useSelector(state=>state.orderDetails)
    const{order,error,loading}=orderDetails

    const dispatch=useDispatch()

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) =>acc+item.price * item.qty,0).toFixed(2)
    }

    useEffect(()=>{
        if(!order ||order._id !== Number(id) ){
            dispatch(getOrderDetails(id))
        }
    },[dispatch,order,id])
   
  return loading ?(
    <Loader/>
  ):error ? (
    <Message variant='danger'>{}</Message>
  ):(
    <div>
        <h1>Order :{order._id}</h1>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name : </strong>{order.user.name}</p>
                    <p><strong>Email : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                    <p>
                        <strong>Shipping: </strong>
                        {order.shippingAddress.address},{order.shippingAddress.city}
                        {' '}
                        {order.shippingAddress.postalcode}
                        {' '}
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                    ):(
                        <Message variant='warning'>Not Delivered</Message>
                    )}
                    {console.log(order)}
                        
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method </h2>
                    <p>
                        <strong>Method : </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                    ):(
                        <Message variant='warning'>Not paid</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items </h2>
                    {order.orderItems.length===0 ? <Message variant='info'>
                        Order cart is empty 
                    </Message>:(
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                             <Link to ={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card >
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Items :
                            </Col>
                            <Col>
                            ${order.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Shipping :
                            </Col>
                            <Col>
                            ${order.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Tax :
                            </Col>
                            <Col>
                            ${order.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Total :
                            </Col>
                            <Col>
                            ${order.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </div>
  )
}

export default OrderScreens