import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import {useEffect,useState} from "react";
import axios from "axios";
import openSocket from "socket.io-client";

export default function Feed() {
const [posts, setPosts] = useState([]);


const fetchPost = async ()=>{
  const response = await axios.get('http://localhost:8000/api/posts/',{withCredentials: true});
  
  setPosts(response.data);}
const createPostSocket =async (post)=>{
  if(post){
   
    fetchPost()
  }
}

useEffect( () => {
  try {
    const fetchPost = async ()=>{
      const response = await axios.get('http://localhost:8000/api/posts/',{withCredentials: true});
      
      setPosts(response.data);
      const socket = openSocket("http://localhost:8000",{
        withCredentials: true
      });
      socket.on("posts",(data)=>{
        if(data.action == "create"){
          createPostSocket(data.post);
        }
        if(data.action == "delete"){
          fetchPost();
        }
      })
  }
  fetchPost(); 
} catch (error) {
    console.log(error);
  }
},[])
  
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
