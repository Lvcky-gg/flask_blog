import React, { useState } from "react";
import RichEditor from "../../components/RichTextEditor";
import { useDispatch } from "react-redux";
import { createPost } from "../../store/post";

const MakePost = () => {
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const handleEditorSubmit = (e, { details }) => {
    e.preventDefault();
    dispatch(createPost({ title, details }));
  };
  return (
    <div className="">
      <div>
        <label>Title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <RichEditor handleEditorSubmit={handleEditorSubmit}></RichEditor>
    </div>
  );
};

export default MakePost;
