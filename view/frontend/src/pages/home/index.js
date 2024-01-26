import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/post";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.allPosts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  console.log(posts);
  return <div className=""></div>;
};

export default Home;
