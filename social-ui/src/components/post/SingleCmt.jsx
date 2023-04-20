import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./Comment.css";
import { Comment, Icon } from 'semantic-ui-react'

function SingleCmt({cmt}) {
    const [user,setUser] = useState({});
    useEffect(()=>{
        const fetchComments = async()=>{
          const fetchUser = await axios.get(`http://localhost:8000/api/users/find/${cmt.userId}`,{
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
        })
          setUser(fetchUser.data);
          
        }
        fetchComments();
      },[cmt.userId])
  return (
    <div className='cmt'>
         <Comment.Avatar as='a' src={`http://localhost:8000${user.profilePicture}`}/>
            
            <Comment.Content>
              <Comment.Author className="cmtUsername" >{user.username}</Comment.Author>
              <Comment.Text className="cmt">
                {cmt.desc}
              </Comment.Text>
            </Comment.Content>
    </div>
  )
}

export default SingleCmt