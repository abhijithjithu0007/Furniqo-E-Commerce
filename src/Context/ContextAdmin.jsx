import axios from 'axios'
import React, { createContext, useState ,useEffect, useContext} from 'react'
import { useLoad } from './LoadingContext'
import axiosInstance from '../axiosInstance'


export const Admincontext = createContext()
const ContextAdmin = ({children}) => { 

    const [usersData, setUsersData] = useState([])
    const {startLoad,stopLoad} = useLoad(useContext)

    useEffect(() => {
      const userFetch = async () => {
        startLoad()
        try {
          const resp = await axiosInstance.get(`/api/admin/alluser`,{withCredentials:true})
          setUsersData(resp.data)
        } catch (error) {
          
        }finally{
          stopLoad()
        }
      }
      userFetch()
    }, [])  

    return (
        <Admincontext.Provider value={{usersData,setUsersData}}>
            {children}
        </Admincontext.Provider>
    )
}

export default ContextAdmin
