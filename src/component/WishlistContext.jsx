import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'

export const wishContext = createContext()
const WishContextProvider = ({ children }) => {

    const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
    const { id } = currentUserData

    const [myWish, setMyWish] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`http://localhost:5000/api/user/viewwishlist/${id}`, { withCredentials: true })
                const data = resp.data.products||[]
                const validPro = data.filter(item => item.product != null && !item.product.deleted);
                setMyWish(validPro);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id, myWish]);
    return (
        <wishContext.Provider value={{ myWish, setMyWish }}>
            {children}
        </wishContext.Provider>
    )
}

export default WishContextProvider
