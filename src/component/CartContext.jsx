import React,{createContext, useState} from 'react'



export const cartContext = createContext()



const CartContextProvider = ({children}) => {
    const [total,setTotal] = useState([])
  return (
   <cartContext.Provider value={{total,setTotal}}>
    {children}
   </cartContext.Provider>
  )
}

export default CartContextProvider
