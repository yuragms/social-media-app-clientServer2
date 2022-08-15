import React from "react";
import "./Posts.css";
import { PostsData } from "../../Data/PostsData.js";
import Post from "../Post/Post";

const Posts = () => {
  return (
    <div className="Posts">
      {PostsData.map((post, id) => {
        return <Post data={post} id={id} key={id} />;
      })}
    </div>
  );
};

export default Posts;
