import React, { createContext, useState ,useEffect} from 'react'


export const Admincontext = createContext()
const ContextAdmin = ({children}) => {
    

    const [usersData, setUsersData] = useState([])


    useEffect(() => {
      const userFetch = async () => {
        try {
          const datas = await fetch("http://localhost:3000/user")
          const jsonUser = await datas.json()
          setUsersData(jsonUser)
        } catch (error) {
          console.log("Err", error);
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
