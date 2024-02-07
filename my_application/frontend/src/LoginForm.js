import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email, 
        password,
      });
      console.log("Login successful");
      navigate("/profile", { state: { email } });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };
  
return (
    <div className="d-flex justify-content-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25 h-50 m-auto">
        <h2 className="d-flex justify-content-center">Login</h2>
        <form>
          <div>
          <label>Email:</label>
          <input
            type="email"
            className="form-control rounded-0"
            placeholder="Enter name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className="mt-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control rounded-0"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <button className="btn btn-success mt-3 w-100" type="button" onClick={handleLogin}>
            Login
          </button>
          <div className="mt-2">
            <span>Don't have account ?</span>
            <Link to="/signup">signup </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
