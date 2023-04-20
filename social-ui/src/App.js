import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
 Routes,
 Route
} from "react-router-dom";
import { useSelector } from "react-redux";


function App() {
  const {currentUser} = useSelector(state=>state);
  return(
  <Routes>
    <Route path="/" element={currentUser? <Home/>:<Login/> }/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/profile/:username" element={currentUser?<Profile/>: <Login/>}/>
    
    
  </Routes>)
}

export default App;
