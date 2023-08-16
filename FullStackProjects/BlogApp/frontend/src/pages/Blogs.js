import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
//import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  let isLogin = useSelector((state) => state.isLogin);
  const buttonStyle={
    backgroundColor: "#4CAF50",/* Green */
    marginTop:"20px",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    cursor:"pointer"
  }
  //get blogs
  //console.log(blogs)
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  if(!isLogin){
    return (
      <div style={{display:"grid",padding:"6px", textAlign:"center",justifyContent:"center",alignItems:"center",marginTop:"80px"}}>
      <h1>
        Welcome to My Blog Application
      </h1>
      <p style={{marginTop:"6px", color:"grey"}}>
      Unlock Your Stories: Create, update, delete, and explore diverse blogs in one seamless platform.
      </p >
      <div>
        <RouterLink to="/login" >
        <button  style={buttonStyle}>
          Get Started
        </button>
        </RouterLink>
        
      </div>
    </div>
    )
  }else{
    return (
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",}}>
        
        {blogs &&
          blogs.map((blog) => (
            <BlogCard 
              id={blog?._id}
              isUser={localStorage.getItem("userId") === blog?.user?._id}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={blog?.user?.username}
              time={blog.createdAt}
            />
          ))}
      </div>
    );
  }
  
};

export default Blogs;