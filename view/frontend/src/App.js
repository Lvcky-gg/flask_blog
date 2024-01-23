import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import { useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";
import { authenticate } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </>
  );
}

export default App;
