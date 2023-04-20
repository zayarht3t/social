import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [repeatPassword,setRepeatPassword] = useState("");
  const [message,setMessage] = useState("");

  const signUpHandler =async (e)=>{
    try {
      e.preventDefault();
    if(password != repeatPassword){
      setMessage("Passwords are not matched");
      return false;
    }
    setMessage("");
    console.log("matched")
    const response = await axios.post("http://localhost:8000/api/auth/register",{username,email,password},{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
      })
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.log(error)
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
            <input placeholder="Username" className="loginInput" onChange={(e)=>setUsername(e.target.value)}/>
            <input placeholder="Email" className="loginInput" onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password" type="password" className="loginInput" onChange={(e)=>setPassword(e.target.value)}/>
            <input placeholder="Password Again" type="password" className="loginInput" onChange={(e)=>setRepeatPassword(e.target.value)}/>
            {message && <h5>{message}</h5>}
            <button className="loginButton" onClick={(e)=>signUpHandler(e)}>Sign Up</button>
            <NavLink to={`/login`} style={{"textAlign": "center"}}>
              <button className="loginRegisterButton">
              Log into Account
            </button>
            </NavLink>
            
          </div>
        </div>
      </div>
    </div>
  );
}
