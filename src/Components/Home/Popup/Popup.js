import React from 'react';
import './popup.css';
import welcome from '../welcome.png'
const Popup = (props) => {

    return ((props.trigger) ? (
        <div className='popup'>
            <div className='popup-box'>
                <div className='above' alignItems='center'>
                <img src={welcome} alt="notfound"/>
                </div>    
                <button className='close' onClick={()=>props.setTrigger(false)}>X</button>
            </div> 
        </div>
    ):null);
}

export default Popup;
