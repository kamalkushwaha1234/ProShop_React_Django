//LoginScreens.js
import React,{useState,useEffect} from 'react'
import { Link, redirect,useParams, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


function LoginScreen() {
    const [email, setemail]=useState('')
    const [password, setpassword] = useState('')
    const history = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const redirect =location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error , loading , userInfo}=userLogin

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])




    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email, password))
    }
    
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label><strong>Email Address</strong></Form.Label>
                <Form.Control type='email' placeholder='Enter your email address' value={email} onChange={(e)=>setemail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setpassword(e.target.value)}></Form.Control>
            </Form.Group>
            <br></br>
            <Button type='submit' variant='primary'>Sign In</Button>
        </form>
        <Row className='py-3'>
            <Col>
            New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen