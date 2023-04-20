import { NavLink } from "react-router-dom";
import "./closeFriend.css";

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
 
          <NavLink to={`/profile/${user._id}`} style={{"textDecoration": "none","display":"flex","color": "black"}} state={{user:user}}>
            <img className="sidebarFriendImg" src={`http://localhost:8000${user?.profilePicture}`} alt="" />
          <span className="sidebarFriendName">{user?.username}</span>
          </NavLink>
          


      
    </li>
  );
}
