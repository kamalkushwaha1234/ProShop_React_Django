import React,{useState,useEffect} from 'react'
import { Link, redirect,useParams, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button,Row,Col ,ListGroup,Image,Card} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import CheckoutStep from '../components/CheckoutStep'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {
    const history=useNavigate()
    const orderCreate= useSelector(state=>state.orderCreate)
    const{order,error,success}=orderCreate
    const dispatch=useDispatch()
    const cart= useSelector(state => state.cart)
    cart.itemsPrice = cart.cartItems.reduce((acc, item) =>acc+item.price * item.qty,0).toFixed(2)
    cart.ShippingPrice = (cart.itemsPrice>100 ? 0 : 10 ).toFixed(2)
    cart.TaxPrice = Number((0.082)*cart.itemsPrice).toFixed(2)
    cart.ToatalPrice = (Number(cart.TaxPrice) +Number(cart.ShippingPrice)+Number(cart.itemsPrice)).toFixed(2)
    if(!cart.paymentMethod){
        history(`/payment`)
    }
    useEffect(()=>{
        if(success){
            history(`/orders/${order._id}`)
            dispatch({type:ORDER_CREATE_RESET})

        }
    },[success,history])
    const placeorder =()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            ShippingPrice:cart.ShippingPrice,
            TaxPrice : cart.TaxPrice,
            ToatalPrice : cart.ToatalPrice
        }))
    }
  return (
    <div>
    <CheckoutStep step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Shipping: </strong>
                        {cart.shippingAddress.address},{cart.shippingAddress.city}
                        {' '}
                        {cart.shippingAddress.postalcode}
                        {' '}
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method </h2>
                    <p>
                        <strong>Method : </strong>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items </h2>
                    {cart.cartItems.length===0 ? <Message variant='info'>
                        Your cart is empty 
                    </Message>:(
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index)=>(
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
                            ${cart.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Shipping :
                            </Col>
                            <Col>
                            ${cart.ShippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Tax :
                            </Col>
                            <Col>
                            ${cart.TaxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Total :
                            </Col>
                            <Col>
                            ${cart.ToatalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                        type='button'
                        className='btn-block'
                        disabled={cart.cartItems ===0}
                        onClick={placeorder}
                        >
                            Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </div>
  )
}

export default PlaceOrderScreen