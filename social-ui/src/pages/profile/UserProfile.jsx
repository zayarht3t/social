import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect,useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserFeed from "../../components/feed/UserFeed";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useLocation } from "react-router-dom";

export default function UserProfile() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state);
  const location = useLocation();
  console.log(location.state.user);
  const user = location.state.user;
  useEffect(()=>{
    const fetchData = async()=>{
      const response =await axios.get(`http://localhost:8000/api/posts/profile/${user._id}`,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
    });
      console.log(response.data)
      setPosts(response.data);
    }
    fetchData()

  },[user._id])
  
  const changeProfile = (e)=>{
    // e.preventDefault();
    // currentUser.profilePicture = posts[0].img
  }
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture}
                alt=""
              />
              <div onClick={(e)=>changeProfile(e)}>
                <AddAPhotoIcon style={{"width": "100%"}} />
              </div>
              
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <UserFeed posts={posts}/>
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
}
