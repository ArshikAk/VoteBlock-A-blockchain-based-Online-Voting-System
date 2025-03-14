import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RouteProtector from "./routeProtector/RouteProtector"

import AdminHome from "./pages/Admin/AdminHome"
import ViewCandidates from "./pages/Admin/ViewCandidates"
import AddCandidate from "./pages/Admin/AddCandidate"
import ViewResults from "./pages/Admin/ViewResults"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/viewCandidates" element={<ViewCandidates />} />
      <Route path="/addCandidate" element={<AddCandidate />} />
      <Route path="/viewResults" element={<ViewResults />} />
      
      
      <Route path="/" element={<RouteProtector/>}>
        <Route path="/" element={<Home/>}></Route>
      </Route>
      
    </Routes>
  )
}

export default App
