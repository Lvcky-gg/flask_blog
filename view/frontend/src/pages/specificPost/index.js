import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getAllPosts, getPost } from "../../store/post";

const Post = () => {
  const post = useSelector((state) => state.posts.displayedPosts.post);
  console.log(post);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getPost(id));
  }, [dispatch]);

  return (
    <div className="w-9/12 pt-24">
      {post && (
        <>
          <h1 className="text-text w-fit m-auto text-4xl ml-9/12">
            {post.title}
          </h1>
          <p className="text-text w-fit m-auto pt-40 text-xl">{post.body} </p>
        </>
      )}
    </div>
  );
};

export default Post;
