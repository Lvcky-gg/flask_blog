import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/post";
import Card from "../../components/postCard";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.allPosts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="flex flex-col m-auto w-9/12 mt-12 ">
      {posts.map(({ title, body, id }) => (
        <Card id={id} key={id} title={title} body={body} />
      ))}
    </div>
  );
};

export default Home;
