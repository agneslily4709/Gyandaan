import React, {useState} from 'react';
import '../Signup/Signup.css';
import {auth,db} from '../../../imp';
import {updateDoc, doc} from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
    const [data,setData] = useState({
    email:'',
    password:'',
    error:null,
    loading:false,

    });
    const navigate = useNavigate();
 
    const {email,password,loading}=data;
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setData({...data,error:null,loading:true})
        if( !email || !password){
            setData({...data,error:"All the fields are required"});
        }
        try {
            const result = await signInWithEmailAndPassword(auth,email,password)
            await updateDoc(doc(db,'users',result.user.uid),{
                isOnline:true,
            })
         setData({
             email:"",
             password:"",
             error:null,
             loading:false})
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
                                <label htmlFor="email">Email</label>
                                <input name="email" type="text" placeholder="Email" value={email} onChange={handleChange} required/>
                            </div>
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" placeholder="Password" value={password} onChange={handleChange} required/>
                            </div>
                        <div className="auth__form-container_fields-content_button">
                            <button disabled={loading} >{loading? "Signing in..." : "Sign In"}</button>
                        </div>            
                    </form>
                        <div className="auth__form-container_fields-account">
                        </div>
        
                </div>
            </div>
        
        </div>
        )
    }
export default SignIn;
