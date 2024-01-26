import React from "react";

const Card = ({ body, title }) => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{title}</div>
        <p class="text-gray-700 text-base">{`${body
          .substring(0, 100)
          .trim()}...`}</p>
      </div>
    </div>
  );
};
export default Card;
