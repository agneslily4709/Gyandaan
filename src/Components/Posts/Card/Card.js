import React from 'react';
import './Card.css'
import {RiMessage2Line} from 'react-icons/ri';
import {SiGooglemeet} from 'react-icons/si';
import {GiPlainCircle} from 'react-icons/gi';
const Card = ({user, selectUser}) => {
  return (
    <div className='user-section'>
   <div className='cardss' onClick={() => selectUser(user)}>
       {user.selected === "mentor" ? 
      (<div className="user-info">
        <div className='user-icons'>
        <li><RiMessage2Line size={30} onClick={() => selectUser(user)}/></li>
        <li><a href='https://gyandaanclass.netlify.app' target="_blank" rel="noopener noreferrer"><SiGooglemeet size={30}/></a></li>
        <li><GiPlainCircle  className={`colour ${user.isOnline ? "online" : "offline"}`}/></li>
        </div>
          <h6>Name : {user.fullName}</h6>
        <p>Location : {user.location}</p>    
      
        <p>Profession : {user.profession}</p> 
        <p>Specilized in : {user.specialized}</p>  
      </div>
      ) : (
        <div className="user-info">
          <div className='user-icons'>
        <li><RiMessage2Line size={30} onClick={() => selectUser(user)}/></li>
        <li><a href='https://gyandaanclass.netlify.app' target="_blank" rel="noopener noreferrer"><SiGooglemeet size={30}/></a></li>
        <li><GiPlainCircle  className={`colour ${user.isOnline ? "online" : "offline"}`}/></li>
        </div>
        <h6>Name : {user.fullName}</h6>
        <p>Location : {user.location}</p>       
        <p>Education : {user.education}</p>  
        </div>)}  
   </div>
   </div>
  );
};

export default Card;