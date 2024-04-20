import React,{useState,useEffect} from 'react'
import { Link, redirect,useParams, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import CheckoutStep from '../components/CheckoutStep'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
  const cart = useSelector(state => state.cart)
  const {shippingAddress} =cart
  const history = useNavigate()
  const dispatch = useDispatch()
  const [address, setaddress]=useState(shippingAddress.address)
  const [city, setcity]=useState(shippingAddress.city)
  const [postalcode, setpostalcode]=useState(shippingAddress.postalcode)
  const [country, setcountry]=useState(shippingAddress.country)

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalcode,country}))
    history('/payment')
  }
  return (
    <FormContainer> 
      <CheckoutStep step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='address'>
          <Form.Label><strong>Address</strong></Form.Label>
          <Form.Control required type='text' placeholder='Enter your Address' value={address ? address : " "} onChange={(e)=>setaddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label><strong>City</strong></Form.Label>
          <Form.Control required type='text' placeholder='Enter your City' value={city ? city : " "} onChange={(e)=>setcity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalcode'>
          <Form.Label><strong>PostalCode</strong></Form.Label>
          <Form.Control required type='text' placeholder='Enter your PostalCode' value={postalcode ? postalcode : " "} onChange={(e)=>setpostalcode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label><strong>Country</strong></Form.Label>
          <Form.Control required type='text' placeholder='Enter your Country' value={country ? country : " "} onChange={(e)=>setcountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Continue</Button>


      </Form>
    </FormContainer>
  )
}

export default ShippingScreen