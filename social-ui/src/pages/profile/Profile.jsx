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
import _ from 'lodash';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state);
  const location = useLocation();
  const user= location.state.user;
  const [follow,setFollow] = useState(currentUser.followings.includes(user._id));
  console.log(location.state.user);
  //const user = location.state.user.length==0?currentUser:location.state.user;
  
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
  
  const relationship =async (e)=>{
    if(currentUser.followings.includes(user._id)){
      const userId = user._id;
      const response = await axios.put(`http://localhost:8000/api/users/unfollow/${user._id}`,{userId},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
        })
      console.log(response);
      setFollow(!follow);

    } else{
      const userId = user._id;
      const response = await axios.put(`http://localhost:8000/api/users/follow/${user._id}`,{userId},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
        })
      console.log(response);
      setFollow(true);
    }

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

                {/* <div style={{"marginBottom": "8px"}}>
                <input type="file" width={'120px'}/>
                <button>Add cover</button>
              </div>
              <input type="file" width={'120px'}/>
                <button>Add profile</button> */}
              <img
                className="profileUserImg"
                src={`http://localhost:8000${user.profilePicture}`}
                alt=""
              />
              <div>
                <AddAPhotoIcon style={{"width": "100%"}} />
              </div>
              
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
                {
                  currentUser._id != user._id
                  && <div style={{"alignItems": "center","textAlign": "center"}} onClick={(e)=>relationship(e)}>
                    <button className="follow"><LocalPostOfficeIcon/>{
                      follow?
                      "unfollow": "follow"
                    }</button>
                  </div>
                }
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
