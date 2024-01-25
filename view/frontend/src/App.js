import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import { useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";
import { authenticate } from "./store/session";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import AllPosts from "./pages/allPosts";
import Post from "./pages/specificPost";
import MakePost from "./pages/makePost";
import NavBar from "./components/navBar";
import { getAllPosts, getPost } from "./store/post";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(dispatch(getPost(1)));
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      {isLoaded && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/posts/create" element={<MakePost />} />
        </Routes>
      )}
    </>
  );
}

export default App;
