import { useState, useContext, createContext } from "react";

const LoadingContext = createContext()

export const useLoad = () => useContext(LoadingContext);


export const LoadingProvider = ({ children }) => {
    const [load, setLoad] = useState(false)


    const startLoad = () => setLoad(true)
    const stopLoad = () => setLoad(false)

    return (
        <LoadingContext.Provider value={{ load, startLoad, stopLoad }}>
            {children}
        </LoadingContext.Provider>
    )

}
