// SignupForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignupForm = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [clgname, setClgname] = useState("");
  // const [branch, setBranch] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        name,
        // clgname,
        // branch,
        age,
        dob,
        contact,
      });
      console.log("Signup successful");
      setEmail("");
      setPassword("");
      setName("");
      
      setAge("");
      setDob("");
      setContact("");
      // setBranch("");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center bg-primary vh-100 ">
        
        <div className="bg-white p-3 rounded w-25 m-auto ">
        <h2 className="d-flex justify-content-center mt-0">Signup</h2>
          <form className="needs -validation" noValidate>
            <div className="flex flex-col gap-4">
              <div className="  ">
                <label>Name:</label>
                <input 
                placeholder="Enter name"
                className="form-control rounded-0"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* <div className=" flex flex-col ">
                <label>College Name:</label>
                <input
                  type="text"
                  value={clgname}
                  onChange={(e) => setClgname(e.target.value)}
                />
              </div>
              <div className=" flex flex-col ">
                <label>Branch:</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div> */}
              <div className=" flex flex-col ">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  className="form-control rounded-0"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className=" flex flex-col">
                <label>Age:</label>
                <input
                  type="tel"
                  placeholder="Enter age"
                  className="form-control rounded"
                  value={age}
                  required
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className=" flex flex-col ">
                <label>Date of birth:</label>
                <input
                  type="date"
                 
                className="form-control rounded-0"
                required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className=" flex flex-col ">
                <label>Contact:</label>
                <input
                  type="text"
                  placeholder="Enter contact"
                  className="form-control rounded-0"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className=" flex flex-col ">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-control rounded-0"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-success mt-3" type="button" onClick={handleSignup}>
                Signup
              </button>
            </div>

            <div className="mt-2 d-flex justify-content-center">
              <span>If already signed up?</span>
              <Link to="/login"> Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
