import React, { createContext, useState, useEffect } from 'react'



export const cartContext = createContext()


const CartContextProvider = ({ children }) => {

  const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
  const myID = currentUserData ? currentUserData.id : ''

  const [total, setTotal] = useState([])
  const [myPro, setMyPro] = useState([])
  useEffect(() => {
    fetch(`https://6b6lwvt1-3000.inc1.devtunnels.ms/user/${myID}`)
      .then(response => response.json())
      .then(data => {
        setMyPro(data.cart || []);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [myPro,myID]);
  return (
    <cartContext.Provider value={{ total, setTotal, myPro, setMyPro }}>
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
