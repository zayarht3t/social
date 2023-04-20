import "./Comment.css";
import React from 'react'
import { Comment, Icon } from 'semantic-ui-react'
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Socket from "socket.io-client";
import SingleCmt from "./SingleCmt";

function CommentPage({post}) {
  const [comments,setComments] = useState([]);
  const [user,setUser] = useState({});
  useEffect(()=>{
    const fetchComments = async()=>{
      const response = await axios.get(`http://localhost:8000/api/comments/get/${post._id}`,{
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      setComments(response.data);
      
    }
    fetchComments();
  },[post._id])
  return (
    <div>
        <Comment className="cmtContainer">
          {
            comments?.map(cmt=>{
              return (
                <div>
                      <SingleCmt cmt={cmt}/>
                </div>
              )
            })
          }
            
            
          </Comment>
    </div>
  )
}

export default CommentPage