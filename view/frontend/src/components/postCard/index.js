import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ body, title, id }) => {
  const nav = useNavigate();
  return (
    <div
      className="w-9/12 rounded overflow-hidden shadow-lg m-auto hover:cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        nav(`/posts/${id}`);
      }}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{`${body
          .substring(0, 100)
          .trim()}...`}</p>
      </div>
    </div>
  );
};
export default Card;
