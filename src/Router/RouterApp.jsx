import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignUp from '../Components/SignUp';
import Home from '../Pages/Home';
import Navbar from '../Components/Navbar';
import ContactUs from '../Pages/ContactUs';
import Login from '../Components/Login';
import Profile from '../Pages/Profile';
import ProductDetails from '../Components/ProductDetails';
import Cart from '../Components/Cart';
import Categories from '../Pages/Categories';
import ScrollToTop from '../Components/Scroll';
import Footer from '../Components/Footer';
import AdminProtectedRoute from '../ProtectedRoute/ProtectedRouteAdmin';
import Admin from '../Admin/Admin';
import CartContextProvider from '../Context/CartContext';
import Wishlist from '../Components/Wishlist';
import WishContextProvider from '../Context/WishlistContext';
import Orders from '../Components/Orders';
import UserProtectedRoute from '../ProtectedRoute/ProtectedRouteUser';
import Spinner from '../Components/Spinner';
import { LoadingProvider } from '../Context/LoadingContext';
import LoadSpinner from '../Components/LoadSpinner';
import axiosInstance from '../axiosInstance';
import SessionExpired from '../Components/SessionExpired';

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
        console.log('Setting isToken to true');
        setIsToken(true);
        localStorage.setItem('isLogin','false')
      }
      return Promise.reject(error);
    };

    const interceptorId = axiosInstance.interceptors.response.use(handleResponse, handleError);

    return () => {
      axiosInstance.interceptors.response.eject(interceptorId);
    };
  }, []);

  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const shouldDisplayFooter = !location.pathname.startsWith('/admin');

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
};

export default RouterApp;
