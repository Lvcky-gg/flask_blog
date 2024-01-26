import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";

const NavBar = () => {
  const nav = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  return (
    <header
      className="
    flex 
    items-center 
    justify-around
    bg-blue 
    h-32 "
      px-4
    >
      <h1
        className="text-whiteBackground
        w-fit
        px-12
        hover:animate-pulse
        hover:cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          nav("/");
        }}
      >
        Home
      </h1>
      <div className="flex-grow px-4 max-w-xl mx-auto"></div>
      {sessionUser ? (
        <div className="pr-12">
          <button
            className="p-8  
             text-whiteBackground       
              hover:animate-pulse
              hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
              nav("/");
            }}
          >
            Logout
          </button>
          <button
            className="p-8  
             text-whiteBackground       
              hover:animate-pulse
              hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              nav("/posts/create");
            }}
          >
            Create
          </button>
        </div>
      ) : (
        <div className="pr-12">
          <button
            className="p-8  
          text-whiteBackground       
        hover:animate-pulse
        hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              nav("/login");
            }}
          >
            Login
          </button>
          <button
            className="p-8
        text-whiteBackground
        hover:animate-pulse
        hover:cursor-pointer

        "
            onClick={(e) => {
              e.preventDefault();
              nav("/signup");
            }}
          >
            Signup
          </button>
        </div>
      )}
    </header>
  );
};
export default NavBar;
