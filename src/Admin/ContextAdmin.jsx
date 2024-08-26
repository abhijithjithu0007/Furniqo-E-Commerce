import axios from 'axios'
import React, { createContext, useState ,useEffect} from 'react'


export const Admincontext = createContext()
const ContextAdmin = ({children}) => { 

    const [usersData, setUsersData] = useState([])

    useEffect(() => {
      const userFetch = async () => {
        try {
          const resp = await axios.get('http://localhost:5000/api/admin/alluser',{withCredentials:true})
          setUsersData(resp.data)
        } catch (error) {
          
        }
      }
      userFetch()
    }, [])
    console.log(usersData);
    
  

    return (
        <Admincontext.Provider value={{usersData,setUsersData}}>
            {children}
        </Admincontext.Provider>
    )
}

export default ContextAdmin
