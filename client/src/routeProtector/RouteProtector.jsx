import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const RouteProtector = () => {

    const {user} = useAuth()

    if(user) {
        return <Outlet/>
    }
    else {
        return <Navigate to="/login" />
    }
  
}

export default RouteProtector
