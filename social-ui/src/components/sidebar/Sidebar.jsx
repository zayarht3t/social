import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";import { Search } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";
import { Socket } from "socket.io-client";


  

export default function Sidebar() {
const [users,setUsers] = useState([]);
const [text,setText] = useState("");
const search =async ()=>{
    
  console.log(text)
  const response = await axios.post("http://localhost:8000/api/users/findAll", {text},{
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
    })
    console.log(response.data);
    setUsers(response.data)
    const socket =new Socket("http://localhost:8000",{
        withCredentials: true
      });
    socket.on("users",(data)=>{
      if(data.action == "search"){
        setUsers(response.data)
      }
    })
    
}
  return (
    <div className="sidebar" >
      <div className="sidebarWrapper">
        <div style={{"display": "flex" ,"alignItems": "center",}} onClick={()=>search()}>
          <input placeholder="search users" className="input" onChange={(e)=>setText(e.target.value)}/>
          <div>
             <Search/>
          </div>
       
        </div>
        
        {/* <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul> */}
        {/* <button className="sidebarButton">Show More</button> */}
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {
            users.map(user=>(
              <CloseFriend key={user._id} user={user} />
            ))
          }
        </ul>
      </div>
    </div>
  );
}
