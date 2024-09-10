import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'


export const cartContext = createContext()
const CartContextProvider = ({ children }) => {

  const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
  const id = currentUserData?.id
  const islogin = JSON.parse(localStorage.getItem('isLogin'));


  const [total, setTotal] = useState([])
  const [myPro, setMyPro] = useState([])
  const apiorigin = import.meta.env.VITE_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`${apiorigin}/api/user/viewcartproducts/${id}`, {
          withCredentials: true
        });
        const data = resp.data.products || [];
        setMyPro(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id,islogin]);
  
 
  return (
    <cartContext.Provider value={{ total, setTotal, myPro, setMyPro }}>
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
