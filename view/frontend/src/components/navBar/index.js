import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const nav = useNavigate();
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
      <div className="pr-12">
        <button
          className="p-8  
          text-whiteBackground       
        hover:animate-pulse
        hover:cursor-pointer"
        >
          Login
        </button>
        <button
          className="p-8
        text-whiteBackground
        hover:animate-pulse
        hover:cursor-pointer
        "
        >
          Signup
        </button>
      </div>
    </header>
  );
};
export default NavBar;
