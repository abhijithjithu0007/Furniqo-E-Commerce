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
import AdminProtectedRoute from '../component/ProtectedRouteAdmin';
import Admin from '../Admin/Admin';
import CartContextProvider from '../Context/CartContext';
import Wishlist from '../component/Wishlist';
import WishContextProvider from '../Context/WishlistContext';
import Orders from '../component/Orders';
import UserProtectedRoute from '../component/ProtectedRouteUser';
import Spinner from '../Pages/Spinner';
import { LoadingProvider } from '../Context/LoadingContext';
import LoadSpinner from '../Pages/LoadSpinner';
import axiosInstance from '../axiosInstance';
import SessionExpired from '../component/SessionExpired'; 

export const Mycontext = createContext();

const RouterApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLogin')));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axiosInstance.get(`/api/user/allproducts`);
        setProducts(resp.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResponse = response => response;
    const handleError = error => {
      if (error.response && error.response.status === 405) {        
        setIsToken(true);        
      }
      return Promise.reject(error);
    };

    const interceptorId = axiosInstance.interceptors.response.use(handleResponse, handleError);

    return () => {
      axiosInstance.interceptors.response.eject(interceptorId);
    }
  }, []);

  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const shouldDisplayFooter = !location.pathname.startsWith('/admin');

  return (
    <div>
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <LoadingProvider>
            <Mycontext.Provider value={{ isLoggedIn, setIsLoggedIn, products, currentUser }}>
              <CartContextProvider>
                <WishContextProvider>
                  <LoadSpinner />
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
                    <Route path="/cart" element={<UserProtectedRoute><Cart /></UserProtectedRoute>} />
                    <Route path="/wishlist" element={<UserProtectedRoute><Wishlist /></UserProtectedRoute>} />
                    <Route path="/orders" element={<UserProtectedRoute><Orders /></UserProtectedRoute>} />
                    <Route path="/admin/*" element={<AdminProtectedRoute adminOnly={true}><Admin /></AdminProtectedRoute>} />
                  </Routes>
                  {shouldDisplayFooter && <Footer />}
                  {isToken && <SessionExpired />} 
                </WishContextProvider>
              </CartContextProvider>
              <ScrollToTop />
            </Mycontext.Provider>
          </LoadingProvider>
        </div>
      )}
    </div>
  );
};

export default RouterApp;
