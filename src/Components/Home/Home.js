import React,{useContext,useEffect,useState} from 'react';
import './Home.css';
import Slideshow from '../Home/Slideshow/slideshow';
import {AuthContext} from "../Auth/Auth";
import {Link} from 'react-router-dom';
import Popup from './Popup/Popup';
const Home = () =>{
    const {user} = useContext(AuthContext);
    const[popup,setPopup] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setPopup(true);
        },5000)
    },[])
    return(
        <div className='homescreen'>
            <Popup className="modal" trigger={popup} setTrigger={setPopup}/>
            <Slideshow/>
                        {/* <button className='btn btn-primary btn-lg start'>Get Started</button> */}
            {user ? (
                      <Link className="nav-link" to="/posts"><button className='btn btn-outline-success btn-lg start'>Get Started</button></Link>
                    ):(
                      <Link className="nav-link" to="/signin"><button className='btn btn-outline-success btn-lg start'>Get Started</button></Link>
            )}

        </div>
    )

}
export default Home;