import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'

export const cartContext = createContext()
const CartContextProvider = ({ children }) => {

  const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
  // const myID = currentUserData ? currentUserData.id : ''
  const {id} = currentUserData
console.log(id);

  const [total, setTotal] = useState([])
  const [myPro, setMyPro] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`http://localhost:5000/api/user/viewcartproducts/${id}`, {
          withCredentials: true
        });
        const data = resp.data.products;
        setMyPro(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <cartContext.Provider value={{ total, setTotal, myPro, setMyPro }}>
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
