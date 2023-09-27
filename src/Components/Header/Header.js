import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { auth,db } from "../../imp";
import { signOut } from "firebase/auth";
import { updateDoc,doc } from "firebase/firestore";
import {AuthContext} from "../Auth/Auth";
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
    <div className="navigation">
      
      <nav className="navbar py-4 navbar-expand navbar-dark bg-dark">
        
        <div className="container">
          <Link className="navbar-brand" to="/" style={{fontWeight:'bolder'}}> GYANDAAN </Link>
          <div>
            <ul className="navbar-nav ml-auto">
               {user ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/profile"> Profile </Link></li>
                  <li className="nav-item"><Link onClick={handleSignout} className="nav-link" to="/"> Sign Out </Link></li>

                </>
                ):(
                <>
                  <li className="nav-item"><Link className="nav-link" to="/signup"> Sign Up </Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/signin"> Sign In</Link></li>
                </>
                )}
              </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;