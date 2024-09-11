import axios from 'axios'
import React, { createContext, useState ,useEffect, useContext} from 'react'
import { useLoad } from './LoadingContext'


export const Admincontext = createContext()
const ContextAdmin = ({children}) => { 

    const [usersData, setUsersData] = useState([])
    const apiorigin = import.meta.env.VITE_API_URL
    const {startLoad,stopLoad} = useLoad(useContext)

    useEffect(() => {
      const userFetch = async () => {
        startLoad()
        try {
          const resp = await axios.get(`${apiorigin}/api/admin/alluser`,{withCredentials:true})
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
