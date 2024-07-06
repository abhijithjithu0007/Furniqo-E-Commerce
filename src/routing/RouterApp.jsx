import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignUp, { Mycontext } from '../component/SignUp';
import Home from '../Pages/Home';
import Navbar from '../NavBar/Navbar';
import ContactUs from '../Pages/ContactUs';
import Login from '../component/Login';
import Profile from '../Pages/Profile';
import ProductDetails from '../component/ProductDetails';
import Cart from '../component/Cart';

import Categories from '../Pages/Categories';
import ScrollToTop from '../component/Scroll';
import Footer from '../component/Footer';
import ProtectedRoute from '../component/ProtectedRoute';
import Admin from '../Admin/Admin';
import DashBoard from '../Admin/DashBoard';
import useFetchProducts from '../component/CoustumeHook';
import CartContextProvider from '../component/CartContext';




const RouterApp = () => {
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLogin')));
  const [myCart, setMyCart] = useState([]);
  const { products, loading, error } = useFetchProducts();
  const [adminData, setAdminData] = useState({ adminName: 'admin', adminEmail: 'nest@admin' });

  const location = useLocation();


  const [currentUser, setCurrentUser] = useState()


  const shouldDisplayFooter = !location.pathname.startsWith('/admin');

  return (
    <div>
      <Mycontext.Provider value={{ userData, setUserData, isLoggedIn, setIsLoggedIn, myCart, setMyCart, products, adminData, setAdminData, currentUser, setCurrentUser }}>
        <CartContextProvider>
          {shouldDisplayFooter && <Navbar isLoggedIn={isLoggedIn} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
          {shouldDisplayFooter && <Footer />}
        </CartContextProvider>
        <ScrollToTop />
      </Mycontext.Provider>
    </div>
  );
};

export default RouterApp;
