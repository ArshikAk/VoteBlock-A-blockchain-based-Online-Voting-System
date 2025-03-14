import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RouteProtector from "./routeProtector/RouteProtector"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<RouteProtector/>}>
        <Route path="/" element={<Home/>}></Route>
      </Route>
      
    </Routes>
  )
}

export default App
