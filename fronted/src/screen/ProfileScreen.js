//ProfileScreen
import React,{useState,useEffect} from 'react'
import { Link, redirect,useParams, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails,updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant'

function ProfileScreen() {
    
    const [name, setname]=useState('')
    const [email, setemail]=useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [message, setmessage] = useState('')
    const history = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    

    const userDetails = useSelector(state => state.userDetails)
    const {error , loading , user}=userDetails
    if (user) {
        console.log('user1', user);
      } else {
        console.log('User is not available yet');
      }

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}=userLogin

    const userUpdateprofile = useSelector(state => state.userUpdateprofile)
    const {success}=userUpdateprofile

    useEffect(()=>{
        if(!userInfo){
            
            history('/login')
        }else{
            if(!user || !user.name  || success){
                
                dispatch({type :USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setname(user.name)
                setemail(user.email)
            }
        }
    },[dispatch,history,userInfo,user,success])




    const submitHandler = (e)=>{
        e.preventDefault()
        if(password != confirmpassword){
            setmessage('Passwords do not match ',password,confirmpassword)
        }else{
            console.log('user2')
            console.log(user)
            dispatch(updateUserProfile({'id' : user.id, 
                    'name' : name,
                    'email' : email,
                    'password' : password
                    
                    }))               
        }
        
    }
  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
            <Form.Label><strong>name</strong></Form.Label>
            <Form.Control  type='name' placeholder='Enter your Name' value={name} onChange={(e)=>setname(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
            <Form.Label><strong>Email Address</strong></Form.Label>
            <Form.Control  type='email' placeholder='Enter your email address' value={email} onChange={(e)=>setemail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label><strong>Password</strong></Form.Label>
            <Form.Control  type='password' placeholder='Enter Password' value={password} onChange={(e)=>setpassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
            <Form.Label><strong>Confirm Password</strong></Form.Label>
            <Form.Control  type='password' placeholder='Enter Confirm Password' value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Update</Button>
        </form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen