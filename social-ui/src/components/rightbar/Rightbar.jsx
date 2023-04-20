import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Rightbar({ profile }) {
  const {currentUser} = useSelector((state)=>state);
  const [users,setUsers] = useState([]);
  const followers = currentUser.followers;
  useEffect(()=>{
    const fetchFollower = async(ids)=>{
     ids.map(id=>userFetch(id));
    }
    fetchFollower(followers);
    //setUsers(users);
    console.log(users);
  },[])
  const userFetch = async(id)=>{
    const user = await axios.get(`http://localhost:8000/api/users/find/${id}`);
    setUsers(prev=>[...prev,user.data]);
  }
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
     
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Followers</h4>
        <div className="rightbarFollowings">
          
            {
              users ? 
                users.map((user)=>{
                  return (
                    
                  <Link to={`/profile/${user._id}`} state={{user: user}}>
                  <div className="rightbarFollowing">
                      <img
                      src={`http://localhost:8000${user.profilePicture}`}
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{user.username}</span>
                  </div>
                  </Link>
                  
                    )

                })
              : "You have not followers"
            }
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
