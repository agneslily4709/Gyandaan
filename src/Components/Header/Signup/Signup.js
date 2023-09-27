import React, {useState} from 'react';
import './Signup.css';
import {auth,db} from '../../../imp';
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
    photo:'',
    error:null,
    loading:false,

    });
    let navigate = useNavigate();
 
    const {fullName,email,password,location,selected,education,profession,specialized,photo,loading}=data;
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
            console.log(result.user)
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
            await setDoc(doc(db,'users',result.user.uid),{
                uid:result.user.uid,
                fullName,
                email,
                password,
                location,
                selected,
                profession,
                specialized,
                createdAt:Timestamp.fromDate(new Date()),
                isOnline:true,
                photo,
            });
        };   
         setData({
             fullName:"",
             email:"",
             password:"",
             location:"",
             selected:"",
             education:"",
             profession:"",
             specialized:"",
             photo:"",
             error:null,
             loading:false
            })    
            navigate('/', { replace: true })
    } 
    catch (error) {
            setData({...data,error:error.message,loading:false})
        }
    }
  return (
        <div className='auth__form-container'>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <form onSubmit={handleSubmit}>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input name="fullName" type="text" placeholder="Full Name" value={fullName} onChange={handleChange} required />
                            </div>
                              <div className="auth__form-container_fields-content_input">
                                <label htmlFor="email">Email</label>
                                <input name="email" type="text" placeholder="Email" value={email} onChange={handleChange} required/>
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" placeholder="Password" value={password} onChange={handleChange} required/>
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="location">Location</label>
                                <input name="location" type="text" placeholder="Location" value={location} onChange={handleChange} required />
                            </div>
                            <div required>
                                <input type="radio" name="selected" value="mentor" onChange={handleChange} checked={data.selected==="mentor"}/>
                                <label>Mentor</label>
                        <div aria-hidden={data.selected !== "mentor" ? true : false}>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="profession">Profession</label>
                                <input name="profession" type="text" placeholder="Profession" value={profession} onChange={handleChange}/>
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="education">Specialized in</label>
                                <input name="specialized" type="text" placeholder="Specialized" value={specialized} onChange={handleChange}/>
                            </div>
                            </div>
                                <input type="radio" name="selected" value="student" onChange={handleChange} checked={data.selected==="student"}/>
                                <label>Student</label>
                            <div aria-hidden={data.selected !== "student" ? true : false}>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="education">Education</label>
                                <input name="education" type="text" placeholder="Educaion" value={education} onChange={handleChange}/>
                            </div>
                    </div>
                            </div>
                            
                        <div className="auth__form-container_fields-content_button">
                            <button disabled={loading} >{loading? "Signing up..." : "Sign Up"}</button>
                        </div>            
                    </form>
                        <div className="auth__form-container_fields-account">
                        </div>
        
                </div>
            </div>
        
        </div>
        )
    }
export default SignUp;
