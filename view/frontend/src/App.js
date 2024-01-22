import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/index";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
