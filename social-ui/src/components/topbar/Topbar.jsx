import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Result from "./Result";
import Sidebar from "../sidebar/Sidebar";

export default function Topbar() {
  const {currentUser} = useSelector((state)=>state);
  const [text,setText] = useState("");
  const [users,setUsers] = useState({});

  const search =async ()=>{
    console.log(text)
    const response = await axios.post("http://localhost:8000/api/users/findByName", {text},{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
      })
      console.log(response.data);
      setUsers(response.data)
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to={'/'} style={{"textDecoration": "none","margin": "0"}}>
          <span className="logo">Inle</span>
        </NavLink>
        
      </div>
      <div className="topbarCenter">
        <div className="searchbar" >
          <div onClick={()=>search()}>
            <Search className="searchIcon" />
          </div>
          
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={(e)=>setText(e.target.value)}
          />
          
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <NavLink to={`/profile/${currentUser._id}`} state={{user: currentUser}}>
          <img src={`http://localhost:8000${currentUser.profilePicture}`} alt="" className="topbarImg"/>
        </NavLink>
        {
           users?.username

        }
        
      </div>
    </div>
  );
}
