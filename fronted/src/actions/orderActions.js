import axios from 'axios'
import { 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS ,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_RESET,
} from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const createOrder =(order)=> async (dispatch,getState) => {
    
    try{
        dispatch({
            type : ORDER_CREATE_REQUEST
        })

        const {
            userLogin : {userInfo},
        }=getState()

        const config = {
            headers :{
                'Content-type' : 'application/json',
                'Authorization' :  `Bearer ${userInfo.access}`
            }
        }
        const {data} = await axios.post(
            '/orders/add/',
            order,
            config
        )
        const access = userInfo.access
        const refresh = userInfo.refresh
        const data2 ={
            ...data,
            access:access,
            refresh : refresh

        }
        console.log(data2,'me hu')

        dispatch({
            type : ORDER_CREATE_SUCCESS,
            payload : data2
        })

        dispatch({
            type : CART_CLEAR_ITEMS,
            payload : data2
        })
        localStorage.removeItem('cartItems')
    
    }
    catch(error){
        dispatch({type : ORDER_CREATE_FAIL,
                  payload : error.response && error.response.data.detail
                  ?error.response.data.detail
                  :error.message
    })
    }
}

export const getOrderDetails =(id)=> async (dispatch,getState) => {
    console.log('id from getorderDetails',id)
    
    try{
        dispatch({
            type : ORDER_DETAILS_REQUEST
        })

        const {
            userLogin : {userInfo},
        }=getState()

        const config = {
            headers :{
                'Content-type' : 'application/json',
                'Authorization' :  `Bearer ${userInfo.access}`
            }
        }
        const {data} = await axios.get(
            `/orders/${id}/`,
            config
        )
        const access = userInfo.access
        const refresh = userInfo.refresh
        const data2 ={
            ...data,
            access:access,
            refresh : refresh

        }
        console.log(data2,'orderActions getOrderDetails')

        dispatch({
            type : ORDER_DETAILS_SUCCESS,
            payload : data2
        })

    
    }
    catch(error){
        dispatch({type : ORDER_DETAILS_FAIL,
                  payload : error.response && error.response.data.detail
                  ?error.response.data.detail
                  :error.message
    })
    }
}

export const payOrder =(id,paymentResult)=> async (dispatch,getState) => {
    console.log('id from getorderDetails',id)
    
    try{
        dispatch({
            type : ORDER_PAY_REQUEST
        })

        const {
            userLogin : {userInfo},
        }=getState()

        const config = {
            headers :{
                'Content-type' : 'application/json',
                'Authorization' :  `Bearer ${userInfo.access}`
            }
        }
        const {data} = await axios.put(
            `/orders/${id}/pay/`,
            paymentResult,
            config
        )
        const access = userInfo.access
        const refresh = userInfo.refresh
        const data2 ={
            ...data,
            access:access,
            refresh : refresh

        }
        console.log(data2,'orderActions getOrderDetails')

        dispatch({
            type : ORDER_PAY_SUCCESS,
            payload : data2
        })

    
    }
    catch(error){
        dispatch({type : ORDER_PAY_FAIL,
                  payload : error.response && error.response.data.detail
                  ?error.response.data.detail
                  :error.message
    })
    }
}