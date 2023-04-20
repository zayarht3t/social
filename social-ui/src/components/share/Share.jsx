import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import EmojiPicker from 'emoji-picker-react';


export default function Share() {
  const {currentUser} = useSelector(state=>state);
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const [desc,setDesc] = useState("");
  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0])
		setIsFilePicked(true);
	};
  console.log(desc)
  const newPost = {
    desc: desc
}
	const handleSubmission =async (selectedFile) => {
    if(selectedFile){
      const data = new FormData();
      const fileName = Date.now() + "";
      
      data.append("file",selectedFile);
      data.append("name",fileName);
      try {
         const response = await axios.post("http://localhost:8000/api/upload",data);
         return response.data;
      } catch (error) {
        console.log(error)
      }
	};
 
  }
  const createPost =async (e)=>{
    try {
      const path =await handleSubmission(selectedFile)
      console.log(path)
      const response = await axios.post("http://localhost:8000/api/posts/",{newPost,path},{
        withCredentials: true
    });
      console.log(response);
       document.getElementsByClassName("shareInput").value = null;
  
    } catch (error) {
      console.log(error)
    }
     //handleSubmission(selectedFile);
    
    }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={`http://localhost:8000${currentUser.profilePicture}`} alt="" />
          <input 
            placeholder="What's in your mind Safak?"
            className="shareInput"
            onChange={(e)=>{setDesc(e.target.value)}}
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <input type="file" name="file" onChange={changeHandler} style={{"width": "80px","fontSize": "10px"}}/>
                  
                      {/* <button onClick={handleSubmission} style={{"width": "50px","fontSize": "10px"}}>Submit</button> */}
                
                    {/* <span className="shareOptionText"  onClick={handleSubmission}>Photo or Video</span> */}
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <a className="shareButton" onClick={(e)=>createPost(e)}>Share</a>
        </div>
      </div>
    </div>
  );
}
