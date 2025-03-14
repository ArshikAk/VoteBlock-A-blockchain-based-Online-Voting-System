/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext()


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState( () => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    })

    useEffect(() => {
        if(user)
        {
            localStorage.setItem("user", JSON.stringify(user))
        }
        else
        {
            localStorage.removeItem("user")
        }
    },[user])

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}