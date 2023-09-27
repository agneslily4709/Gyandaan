import React, {useState, useEffect } from "react";
import Img from "../../Images/dp.jpg";
import { Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../imp";
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
  },[])
  return user ? (
    <div className="blank">
    <div className="profile_container">
        <div className="img_container">
          <img src={Img} alt="avatar" />
        </div>
        <div className="text_container">
        <Link className="nav-link" to="/posts"><button className="button-close">X</button></Link>
          <p>Name : {user.fullName}</p>
          <p>Location : {user.location}</p>
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
          <hr />
          <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
      </div>
  ) : null;
};

export default Profile;
