import React,{useContext,useEffect,useState} from 'react';
import '../styles.css';
import Slideshow from '../Pages/slideshow';
import {AuthContext} from "./Auth/Auth";
import {Link} from 'react-router-dom';
import Popup from '../Pages/Popup';
const Home = () =>{
    const {user} = useContext(AuthContext);
    const[popup,setPopup] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setPopup(true);
        },5000)
    },[])
    return(
        <div className='home-container'>
            {/* <Popup className="modal" trigger={popup} setTrigger={setPopup}/> */}
            <Slideshow/>
                        {/* <button className='btn btn-primary btn-lg start'>Get Started</button> */}
            {user ? (
                      <Link className="nav-link" to="/posts"><button className='my-button'>Get Started</button></Link>
                    ):(
                      <Link className="nav-link" to="/signin"><button className='my-button'>Get Started</button></Link>
            )}

        </div>
    )

}
export default Home;