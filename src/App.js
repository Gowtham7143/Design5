// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BuyerLogin from './components/Buyer/BuyerLogin';
import BuyerSignUp from './components/Buyer/BuyerSignUp';
import SellerLogin from './components/Seller/SellerLogin';
import SellerSignUp from './components/Seller/SellerSignUp';
import Cart from './components/Buyer/Cart';
import Home from './components/Home';
import { AuthProvider } from './AuthContext';
import BuyerProfile from './components/Buyer/BuyerProfile';
import SellerProfile from './components/Seller/SellerProfile';
import Display from './components/Display';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Display />} />
          <Route path='/home' element={<Home />} />
          <Route path='/buyer/BuyerLogin' element={<BuyerLogin />} />
          <Route path="/buyer/signup" element={<BuyerSignUp />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/signup" element={<SellerSignUp />} />
          <Route path="/cart" element={Cart} />
          <Route path='/buyer/profile' element={<BuyerProfile />}></Route>
          <Route path='/seller/profile' element={<SellerProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


