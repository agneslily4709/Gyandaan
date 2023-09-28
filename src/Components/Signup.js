import React, {useState} from 'react';
import '../styles.css';
import {auth,db} from '../imp';
import {setDoc, doc,Timestamp} from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [data,setData] = useState({
    fullName:'',
    email:'',
    password:'',
    location:'',
    selected:'',
    education:'',
    profession:'',
    specialized:'',
    photo:`&#12851${Math.floor(Math.random() * (7 - 2 + 1)) + 2};`,
    });
    let navigate = useNavigate();
 
    const {fullName,email,password,location,selected,education,profession,specialized,photo}=data;
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setData({...data,error:null,loading:true})
        if(!fullName || !email || !password || !location){
            setData({...data,error:"All the fields are required"});
        }
        try {
            const result = await createUserWithEmailAndPassword(auth,email,password)
            {data.selected === "student" ?
            await setDoc(doc(db,'users',result.user.uid),{
                uid:result.user.uid,
                fullName,
                email,
                password,
                location,
                selected,
                education,
                createdAt:Timestamp.fromDate(new Date()),
                isOnline:true,
                photo,
            }):
            await setDoc(doc(db,'users',result.user.uid),{    uid:result.user.uid,    fullName,    email,    password,    location,    selected,    profession,    specialized,    createdAt:Timestamp.fromDate(new Date()),    isOnline:true,    photo,});
        };   
         setData({ fullName:"", email:"", password:"", location:"", selected:"", education:"", profession:"", specialized:"", photo:"", error:null, loading:false})    
            navigate('/', { replace: true })
    } 
    catch (error) {
            setData({...data,error:error.message,loading:false})
        }
    }
  return (
        <>
        <div className='my-container'>
                    <form method='POST' className='form-component'>
    <h3 className='form-title'>SignUp</h3>
    <input
        name="fullName"
        type="text"
        placeholder="Full Name"
        value={data.fullName}
        onChange={handleChange}
        required
      />
        <div className='row'>
        <input
        onChange={handleChange}
        className='col ms-2 me-2'
        placeholder="Enter Mail"
        type="email"
        value={data.email}
        name="email"
        required
      />
      <input
        onChange={handleChange}
        className='col me-2 ms-2'
        placeholder="Enter Password"
        type="password"
        value={data.password}
        name="password"
        required
      />
        </div>
      <input
        name="location"
        type="text"
        placeholder="Location"
        value={data.location}
        onChange={handleChange}
        required
      />
      <select
        name="selected"
        value={data.selected}
        onChange={handleChange}
        defaultValue=""
        required
      >
        <option value="" disabled>
    Select an option
  </option>
        <option value="student">Student</option>
        <option value="mentor">Mentor</option>
      </select>
      {data.selected === 'mentor' && (
        <div className='row'>
          <input
            name="profession"
            className='col ms-2 me-2'
            type="text"
            placeholder="Profession"
            value={data.profession}
            onChange={handleChange}
          />
          <input
            name="specialized"
            className='col ms-2 me-2'
            type="text"
            placeholder="Specialized"
            value={data.specialized}
            onChange={handleChange}
          />
        </div>
      )}
      {data.selected === 'student' && (
        <input
          name="education"
          type="text"
          placeholder="Education"
          value={data.education}
          onChange={handleChange}
        />
      )}
      <button className="my-button" value="login" onClick={handleSubmit}>SignUp</button>
    </form>
        </div>
        </>
        )
    }
export default SignUp;