import React,{useState,useEffect} from 'react'
import { Link, redirect,useParams, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import CheckoutStep from '../components/CheckoutStep'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen() {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} =cart
  const dispatch =useDispatch()
  const history = useNavigate()
  const [paymentMethod,setpaymentMethod]=useState('PayPal')
  if(!shippingAddress.address){
    history('/shipping')
  }
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history('/placeorder')
  }
  return (
    <FormContainer>
        <CheckoutStep step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'> Select Method </Form.Label>
                <Col>
                    <Form.Check type='radio' label='Paypal or Credit Card ' id='paypal' name='paymentMethod' checked onChange={(e)=>setpaymentMethod(e.target.value)}>

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen