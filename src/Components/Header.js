import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { auth,db } from "../imp";
import { signOut } from "firebase/auth";
import { updateDoc,doc } from "firebase/firestore";
import {AuthContext} from "./Auth/Auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const handleSignout = async()=>{
    await updateDoc(doc(db,'users',auth.currentUser.uid),{
      isOnline:false
    });
    await signOut(auth);
    navigate('/signin', { replace: true });
  }
  return (
      
      <nav className="navbar py-3 navbar-expand my-navbar">
        
        <div className="container">
          <Link className="navbar-brand" to="/" style={{fontWeight:'bolder' ,color: "#FFC857"}}> GYANDAAN </Link>
          <div>
            <ul className="navbar-nav ml-auto">
               {user ? (
                <>
                  <li className="nav-item"><Link className="nav-link my-navbar-item" to="/profile"> Profile </Link></li>
                  <li className="nav-item"><Link onClick={handleSignout} className="nav-link my-navbar-item" to="/"> Sign Out </Link></li>
                </>
                ):(
                <>
                  <li className="nav-item"><Link className="nav-link my-navbar-item" to="/signup"> Sign Up </Link></li>
                  <li className="nav-item"><Link className="nav-link my-navbar-item" to="/signin"> Sign In</Link></li>
                </>
                )}
              </ul>
          </div>
        </div>
      </nav>

  );
}
export default Header;