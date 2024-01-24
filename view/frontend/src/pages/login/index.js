import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import validateInput from "../../utils/validateInput";
import { Navigate } from "react-router-dom";
import { login } from "../../store/session";
import { clearErrors } from "../../store/session";

const Login = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const validationErrors = useSelector(
    (state) => state.session.validationErrors
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputValidate, setInputValidate] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInput({ email, password });
    if (errors.length) {
      setInputValidate(errors);
    } else {
      setInputValidate([]);
      dispatch(login({ email, password }));
    }
  };
  useEffect(() => {
    // Login successful?
    if (sessionUser) {
      <Navigate to="/" />;
    }

    const clearErrorMessages = () => {
      dispatch(clearErrors());
    };

    return () => clearErrorMessages();
  }, [sessionUser, dispatch]);

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
      {/* <h1 className="w-fit p-12 m-auto">Log In</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="w-fit p-12 m-auto flex flex-col">
          <label className="m-auto w-fit mb-2">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-fit p-12 m-auto flex flex-col">
          <label className="m-auto w-fit mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-fit p-12 m-auto">
          <button type="submit" className="text-blue">
            Log In
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

export default Login;
