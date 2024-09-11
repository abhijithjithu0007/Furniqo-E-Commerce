import axios from 'axios'
import React, { createContext, useState ,useEffect} from 'react'


export const Admincontext = createContext()
const ContextAdmin = ({children}) => { 

    const [usersData, setUsersData] = useState([])
    const apiorigin = import.meta.env.VITE_API_URL

    useEffect(() => {
      const userFetch = async () => {
        try {
          const resp = await axios.get(`${apiorigin}/api/admin/alluser`,{withCredentials:true})
          setUsersData(resp.data)
        } catch (error) {
          
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
