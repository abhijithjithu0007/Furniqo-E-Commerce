import React, { createContext, useState, useEffect } from 'react'; 
import { Routes, Route, useLocation } from 'react-router-dom'; 
import SignUp from '../component/SignUp'; 
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
import CartContextProvider from '../component/CartContext'; 
import Wishlist from '../component/Wishlist'; 
import WishContextProvider from '../component/WishlistContext'; 
import Orders from '../component/Orders'; 
import axios from 'axios'; 

export const Mycontext = createContext(); 

const RouterApp = () => { 
  const [userData, setUserData] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLogin'))); 
  const [myCart, setMyCart] = useState([]); 
  const [products, setProducts] = useState([]); 

  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const resp = await axios.get('http://localhost:5000/api/user/allproducts'); 
        setProducts(resp.data); 
      } catch (error) { 
        console.log(error); 
      } 
    }; 
    fetchData(); 
  }, []); 

  const location = useLocation(); 
  const [currentUser, setCurrentUser] = useState(); 
  const shouldDisplayFooter = !location.pathname.startsWith('/admin'); 

  return ( 
    <div> 
      <Mycontext.Provider value={{ isLoggedIn, setIsLoggedIn, products, currentUser, setCurrentUser }}> 
        <CartContextProvider> 
          <WishContextProvider> 
            {shouldDisplayFooter && <Navbar isLoggedIn={isLoggedIn} />} 
            <Routes> 
              <Route path="/" element={<Home />} /> 
              <Route path="/home" element={<Home />} /> 
              <Route path="/signup" element={<SignUp />} /> 
              <Route path="/contactus" element={<ContactUs />} /> 
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn} />} /> 
              <Route path="/category/:id" element={<ProductDetails />} /> 
              <Route path="/category" element={<Categories />} /> 
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} /> 
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} /> 
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} /> 
              <Route path="/admin/*" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} /> 
            </Routes> 
            {shouldDisplayFooter && <Footer />} 
          </WishContextProvider> 
        </CartContextProvider> 
        <ScrollToTop /> 
      </Mycontext.Provider> 
    </div> 
  ); 
}; 

export default RouterApp;
