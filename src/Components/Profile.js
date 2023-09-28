import React, {useState, useEffect } from "react";
import Img from "../Assets/dp.jpg";
import { useNavigate } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../imp";
import '../styles.css';

const Profile = () => {
        const navigate = useNavigate()
  const [user, setUser] = useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  },[])
  return user ? (
    <div className="my-container">
    <div className="profile-component">
        <h3 className="form-title">Profile</h3>

        <div className="profile-details">
        <span style={{fontSize:"125px"}}>&#128513;</span>
        <div className="text_container">
          <p>Name : {user.fullName}</p>
          <p>Location : {user.location}</p>
          <p>Occupation:{user.selected}</p>
          {user.selected === "mentor" ? (
              <div>
              <p>Profession : {user.profession}</p>
              <p>Specialization : {user.specialized}</p>
                </div>
          ):(
              <div>
              <p>Education : {user.education}</p>
              </div>
          )}
        </div>
      </div>
        <hr/>
      <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
      <button className="my-button w-100" onClick={()=>navigate("/posts")}>Close</button>
          </div>
      </div>
  ) : null;
};

export default Profile;
