import "./post.css";
import { useState,useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import {format} from "timeago.js";
import { NavLink } from "react-router-dom";
import MenuListComposition from "./MenuListComposition";
import Image from "./1.jpeg"
import { ConfirmProvider } from "material-ui-confirm";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Comment, Icon } from 'semantic-ui-react'
import CommentPage from "./CommentPage";
import { Socket } from "socket.io-client";

export default function Post({ post }) {
  const {currentUser} = useSelector((state)=>state);
  const [like,setLike] = useState(post.likes?.length)
  const [islike,setIsLike] = useState(post.likes.includes(currentUser._id))
  const [user,setUser] = useState({});
  const [change,setChange] = useState(false)
  let likeLength = like-1;
  const [showMore, setShowMore] = useState(false);
  const [cmt,setCmt] = useState(false);
  const inputElement = useRef();
  const [text,setText] = useState("");
  const [rescmt,setRescmt] =useState ({});
  useEffect( () => {
    try {
      const fetchUser = async ()=>{
        const response = await axios.get(`http://localhost:8000/api/users/find/${post.userId}`);
        setUser(response.data);
      
    }
    fetchUser(); 
    const socket =new Socket("http://localhost:8000",{
        withCredentials: true
      });
      socket.on("cmt",(data)=>{
        setRescmt(prev=>[data,...prev]);
      })
  } catch (error) {
      console.log(error);
    }
  },[])

  const removeLike =async ()=>{
    try {
      const response = await axios.put(`http://localhost:8000/api/posts/unlike/${currentUser._id}`,{post},{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
    console.log(response.data);

    setChange(true);
  } catch (error) {
    console.log(error)
  }
  }

  const focusInput =async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/comments/add",{desc: text,postId: post._id,userId: currentUser._id},{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      console.log(response.data)
      setRescmt(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  const liking =async()=>{
    try {
        const response = await axios.put(`http://localhost:8000/api/posts/like/${currentUser._id}`,{post},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      console.log(response.data);
      setIsLike(true)
      setChange(false)
    } catch (error) {
      console.log(error)
    }
    
    
  }
  const showCmt = (e)=>{
    e.preventDefault();
    setCmt(!cmt);

  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <NavLink to={`/profile/${user._id}`} state={{user: user}} style={{display: "flex",alignItems: "center",textDecoration: "none"}}>
            <img
              className="postProfileImg"
              //src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              src={`http://localhost:8000${user.profilePicture}`}
              alt=""
            />
            <span className="postUsername">
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
              {user?.username}
            </span>
            </NavLink>
            
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {/* <MoreVert /> */}
            <ConfirmProvider>
              <MenuListComposition user={user} post={post}/>
            </ConfirmProvider>
            
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {showMore ? post.desc : post.desc?.slice(0, 150)}
            <button className="btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less": "...Show More"}</button>
            
          </span>
          {
            post.img?.split(".")[1] != "mp4"
            ?<img  className="postImg" src={`http://localhost:8000/${post.img}`} alt="" />
            :<video width="100%" height="300" controls >
          <source src={`http://localhost:8000/${post.img}`} type="video/mp4"/>
          </video>

          }
          
          
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img className="likeIcon" onClick={likeHandler} alt="" >
              
            </img> */}
            {/* onClick={()=>liking()} */}
            <div  style={{borderColor: "red"}}>
              {
               islike & change==false ?
                <div onClick={()=>removeLike()}>
                  <ThumbUpRoundedIcon style={{"color":"blue"}} />
                </div> 
                
                :
                <div onClick={()=>liking()}>
                  <ThumbUpAltOutlinedIcon />
                </div>
                
              }
              
            </div>
            
            {/* <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <FavoriteBorderOutlinedIcon/>
            <span className="postLikeCounter">{
              //post.likes?.includes(currentUser._id) 
              islike
              ?
              
              `You and ${like} people like it`
              :`${like}  people like it`
            }</span>
          </div>
          <div className="postBottomRight" onClick={(e)=>showCmt(e)}>
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
         
        {
         
          cmt && <Comment.Group>
            <div className="cmtC">
              <input type="text" placeholder="write your comment" className="cmtBox" ref={inputElement} onChange={(e)=>setText(e.target.value)}/>
              <button className="cmtBtn" onClick={()=>focusInput()}>OK</button>
            </div>
          {
            <CommentPage post={post}/>
          }
        </Comment.Group>
        }
      </div>
    </div>
  );
}
