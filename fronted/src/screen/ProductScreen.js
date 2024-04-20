//ProductScreen.js
import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button ,Card,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listProductDetails } from '../actions/productActions'


function ProductScreen() {
    const[qty,setqty]=useState(1)
    const dispatch= useDispatch()
    const history = useNavigate()
    const { id } = useParams()
    const productDetails=useSelector(state => state.productDetails)
    const {loading,error,product=[]}=productDetails
    console.log(product)
    console.log(product.numReviews)

  useEffect(()=>{
        dispatch(listProductDetails(id))
    }
   
   , [dispatch,id])

   const addToCartHandler=()=>{
    history(`/cart/${id}?qty=${qty}`)
   }
    
  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {loading?
            <Loader />
            : error 
            ? <Message variant='danger'>{error}</Message>
            :(
                <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup varinat="flush">

                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price:${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description :{product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Price :
                                </Col>
                                <Col>
                                <strong>${product.price}</strong>
                                </Col>

                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Status :
                                </Col>
                                <Col>
                                {product.countInStock > 0 ?'In Stock' :'Out Stock'}
                                </Col>

                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty </Col>
                                    <Col xs='auto' className='my-1'>
                                        <Form.Control  as='select' value={qty} onChange={(e)=> setqty(e.target.value)}>
                                            
                                            {
                                                [...Array(product.countInStock).keys()].map((x)=>(
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <div className='contaner'>
                            <Button className='btn-block'
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock===0} 
                                    type="button">ADD TO CART</Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            )
        }
        
    </div>
  )
}

export default ProductScreen

