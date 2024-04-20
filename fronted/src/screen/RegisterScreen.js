//RegisterScreen.js

import React,{useState,useEffect} from 'react'
import { Link, redirect,useParams, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'



function RegisterScreen() {
    const [name, setname]=useState('')
    const [email, setemail]=useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [message, setmessage] = useState('')
    const history = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const redirect =location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error , loading , userInfo}=userRegister

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])




    const submitHandler = (e)=>{
        e.preventDefault()
        if(password != confirmpassword){
            setmessage('Passwords do not match ')
        }else{
            dispatch(register(name,email, password))
        }
        
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
            <Form.Label><strong>name</strong></Form.Label>
            <Form.Control required type='name' placeholder='Enter your Name' value={name} onChange={(e)=>setname(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label><strong>Email Address</strong></Form.Label>
            <Form.Control required type='email' placeholder='Enter your email address' value={email} onChange={(e)=>setemail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label><strong>Password</strong></Form.Label>
            <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e)=>setpassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
            <Form.Label><strong>Confirm Password</strong></Form.Label>
            <Form.Control required type='password' placeholder='Enter Confirm Password' value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Register</Button>
        </form>
        <Row className='py-3'>
            <Col>
            New Customer ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default RegisterScreen