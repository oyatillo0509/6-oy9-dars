import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, [token, location.pathname, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
