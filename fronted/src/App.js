import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screen/HomeScreen'
import ProductScreen from './screen/ProductScreen'
import CartScreen from './screen/CartScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProfileScreen from './screen/ProfileScreen'
import ShippingScreen from './screen/ShippingScreen'
import PaymentScreen from './screen/PaymentScreen'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreens from './screen/OrderScreens'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes> 
            <Route path='/' element={<HomeScreen />} /> 
            <Route path='/login' element={<LoginScreen />} /> 
            <Route path='/register' element={<RegisterScreen />} /> 
            <Route path='/profile' element={<ProfileScreen />} /> 
            <Route path='/shipping' element={<ShippingScreen />} /> 
            <Route path='/placeorder' element={<PlaceOrderScreen />} /> 
            <Route path='/orders/:id' element={<OrderScreens />} /> 
            <Route path='/payment' element={<PaymentScreen />} /> 
            <Route path='/product/:id' element={<ProductScreen />} /> 
            <Route path='/cart/:id?' element={<CartScreen />} /> 
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
