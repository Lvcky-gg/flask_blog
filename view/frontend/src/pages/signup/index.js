import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signUp } from "../../store/session";
import validateInput from "../../utils/validateInput";

const SignUp = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const validationErrors = useSelector(
    (state) => state.session.validationErrors
  );
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputValidate, setInputValidate] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInput({
      email,
      password,
      username,
      confirmPassword,
    });
    if (errors.length) {
      setInputValidate(errors);
    } else {
      setInputValidate([]);
      dispatch(signUp({ username, email, password }));
    }
  };

  if (sessionUser) return <Navigate to="/" />;
  let errorObject = [];
  if (validationErrors) {
    errorObject = Object.values(
      validationErrors.reduce((acc, error) => {
        const [key, value] = error.split(" : ");
        acc[key] = value;
        return acc;
      }, {})
    );
  }
  return (
    <div className="flex flex-col m-auto w-9/12 mt-12 text-xl">
      {/* <h1 className="w-fit p-2 m-auto">Sign Up</h1> */}
      <form onSubmit={handleSubmit}>
        {/* <ul className="w-fit pt-2 m-auto">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <div className="w-fit p-2 m-auto flex flex-col">
          <label className="w-fit p-12 m-auto">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-fit p-2 m-auto flex flex-col">
          <label className="w-fit p-12 m-auto">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="w-fit p-2 m-auto flex flex-col">
          <label className="w-fit p-12 m-auto">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-fit p-2 m-auto flex flex-col">
          <label className="w-fit p-12 m-auto">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-fit p-2 m-auto flex flex-col">
          <button type="submit" className="w-fit p-12 m-auto">
            Sign Up
          </button>
        </div>
      </form>

      <ul className="">
        {inputValidate &&
          inputValidate.map((error, idx) => (
            <li key={idx} className="p-12 m-auto">
              <span style={{ color: "red", padding: "5px" }}>
                <i className="fas fa-exclamation-circle"></i>
              </span>
              {error}
            </li>
          ))}
        {errorObject &&
          errorObject.map((error, idx) => (
            <li key={idx}>
              <span style={{ color: "red", padding: "5px" }}>
                <i className="fas fa-exclamation-circle"></i>
              </span>
              {error}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SignUp;
