import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import {useEffect,useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function UserFeed({posts}) {
const { currentUser } = useSelector((state) => state);
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
