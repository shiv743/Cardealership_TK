import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import AppointmentPage from "./pages/Booking";
import axios from "axios";
import Location from "./pages/Location";
import AdminPage from "./pages/AdminPage";
import Financing from "./pages/Financing";
import WheelsAndTires from "./pages/WheelsAndTires";
import AutoRepair from "./pages/AutoRepair";
import AboutUs from "./pages/AboutUs";

function App() {
  const [user, setUser] = useState(null);

  // Use this env var in Netlify later:
  // REACT_APP_API_URL = https://your-backend.onrender.com
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081";

  const handleLogin = async (credentials) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, credentials);
      setUser(res.data);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async (userData) => {
    try {
      await axios.post(`${API_URL}/auth/register`, userData);
      alert("Signup successful! Please login.");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inventory" element={<Home />} />
          <Route path="/car-details" element={<CarDetails />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route
            path="/login"
            element={<Login onLogin={handleLogin} isAuthenticated={!!user} />}
          />

          <Route
            path="/signup"
            element={<SignIn onSignup={handleSignup} isAuthenticated={!!user} />}
          />

          <Route path="/booking" element={<AppointmentPage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/finance" element={<Financing />} />
          <Route path="/wheels" element={<WheelsAndTires />} />
          <Route path="/repair" element={<AutoRepair />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
