import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp, { Mycontext } from '../component/SignUp';

import Home from '../Pages/Home'
import Navbar from '../NavBar/Navbar';
import ContactUs from '../Pages/ContactUs';
import Login from '../component/Login';
import Profile from '../Pages/Profile';
import ProductDetails from '../component/ProductDetails';
import Cart from '../component/Cart';
import { babyProducts } from '../db/Api';
import Categories from '../Pages/Categories';
import ScrollToTop from '../component/Scroll';
import Footer from '../component/Footer';



const RouterApp = () => {
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLogin')));
  const[myCart,setMyCart] = useState([])
  const [api, setApi] = useState(babyProducts);

  return (
    <div>
       <Mycontext.Provider value={{ userData, setUserData, isLoggedIn, setIsLoggedIn , myCart,setMyCart,api,setApi}}>
      <Navbar isLoggedIn={isLoggedIn} />   
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> :<Login setIsLoggedIn={setIsLoggedIn} />} /> 
          <Route path='/category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/category' element={<Categories/>}/>
        </Routes>
        <Footer/>
        <ScrollToTop/>
      </Mycontext.Provider>
      
    </div>
  );
};

export default RouterApp;
