import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react'
import { useLoad } from './LoadingContext';
import axiosInstance from '../axiosInstance';

export const wishContext = createContext()
const WishContextProvider = ({ children }) => {

    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const islogin = JSON.parse(localStorage.getItem('isLogin'));


    const  id  = currentUserData?.id    
    const {startLoad,stopLoad} = useLoad(useContext)

    const [myWish, setMyWish] = useState([])
    const fetchData = async () => {
    startLoad()
        try {
            const resp = await axiosInstance.get(`/api/user/viewwishlist/${id}`, { withCredentials: true })
            const data = resp.data.products || []
            setMyWish(data);
        } catch (error) {
            console.log(error);
        }finally{
            stopLoad()
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
