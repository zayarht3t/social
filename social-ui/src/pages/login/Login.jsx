import "./login.css";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate, } from "react-router-dom";
import { Home } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";


export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin =async ()=>{
    try {
      dispatch(loginStart)
      const response = await axios.post("http://localhost:8000/api/auth/signin",{email,password},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
    })
    setError("");
    console.log(response.data) 
    navigate('/');
    dispatch(loginSuccess(response.data))
    } catch (err) {
      setError(err.response.data);
      dispatch(loginFailure())
    }

  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">InleBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" name="username" onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password"  type="password" className="loginInput" name="password" onChange={(e)=>setPassword(e.target.value)}/>
            {error && <h4 style={{color: "#E10600"}}>{error}!!!</h4>}
            <button className="loginButton" onClick={()=>handleLogin()}>Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <NavLink to={"/register"} style={{"textAlign": "center"}}>
              <button className="loginRegisterButton">
              Create a New Account
            </button>
            </NavLink>
            
          </div>
        </div>
      </div>
    </div>
  );
}
