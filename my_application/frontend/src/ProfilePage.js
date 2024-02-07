import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const email = location.state.email;
  const navigate = useNavigate();
console.log(email);
  const [details, setDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user?email=${email}`
      );
      setDetails(response.data);
      setEditedDetails(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    if (isEditing) {
      axios
        .put(`http://localhost:5000/user/${details.id}`, editedDetails)
        .then((response) => {
          console.log("User details updated successfully");
          // Re-fetch user details after successful update
          fetchUserData();
        })
        .catch((error) => {
          console.error("Error updating user details:", error.message);
        });
    }
    setIsEditing(!isEditing);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center bg-primary vh-100">
    <div className="max-w-md mx-auto p-4 bg-gray-100  rounded-lg m-auto w-50 h-50%">
      <h1 className="text-xl font-bold mb-4 d-flex justify-content-center">Profile</h1>
      <div className="m-auto">
        {!isEditing ? (
          <div>
            <p>
              <strong>Name:</strong> {details.name}
            </p>
            {/* <p>
              <strong>College Name:</strong> {details.collegeName}
            </p>
            <p>
              <strong>Branch:</strong> {details.branch}
            </p> */}
            <p>
              <strong>Age:</strong> {details.age}
            </p>
            
            <p>
              <strong>Date of Birth:</strong> {formatDate(details.dob)}
            </p>
            <p>
              <strong>Contact:</strong> {details.contact}
            </p>
          </div>
        ) : (
          <form>
            <div className="mb-3 ">
            <input
              type="text"
              name="name"
              className="form-control"
              value={editedDetails.name}
              onChange={handleChange}
            />
            </div>
            {/* <input
              type="text"
              name="collegeName"
              value={editedDetails.clgname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="branch"
              value={editedDetails.branch}
              onChange={handleChange}
            /> */}
             <div className="mb-3">
            <input
              type="number"
              className="form-control"
              name="age"
              value={editedDetails.age}
              onChange={handleChange}
            /></div>
             <div className="mb-3">
            <input
           
              type="date"
              name="dob"
              className="form-control"
              value={formatDate(editedDetails.dob)} // Use formatDate to format the date
              onChange={handleChange}
            /></div>
             <div className="mb-3">
            <input
              type="number"
              name="contact"
              className="form-control"
              value={editedDetails.contact}
              onChange={handleChange}
            /></div>
            
          </form>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className= {`bg-${isEditing ? "green" : "blue"}-500 hover:bg-${
            isEditing ? "green" : "blue"
          }-700 mt-3 text-white p-4 btn btn-dark font-bold py-1 px-10 rounded focus:outline-none focus:shadow-outline`}
          type="button"
          onClick={toggleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <button className="btn btn-danger mt-5" 
      onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
};

export default ProfilePage;
