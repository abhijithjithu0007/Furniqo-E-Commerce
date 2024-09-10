import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'

export const wishContext = createContext()
const WishContextProvider = ({ children }) => {

    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const islogin = JSON.parse(localStorage.getItem('isLogin'));
    const apiorigin = import.meta.env.VITE_API_URL


    const  id  = currentUserData?.id

    const [myWish, setMyWish] = useState([])
    const fetchData = async () => {
        try {
            const resp = await axios.get(`${apiorigin}/api/user/viewwishlist/${id}`, { withCredentials: true })
            const data = resp.data.products || []
            setMyWish(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      fetchData()
    }, [id, islogin])
    return (
        <wishContext.Provider value={{ myWish, setMyWish,fetchData }}>
            {children}
        </wishContext.Provider>
    )
}

export default WishContextProvider
