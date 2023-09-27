import React, {useState} from 'react';
import '../styles.css';
import {auth,db} from '../imp';
import {updateDoc, doc} from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {

    const [data,setData] = useState({ email:'', password:'', });
    const navigate = useNavigate();
    const {email,password}=data;
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
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
             password:""})
             navigate('/', { replace: true })
            } 

    catch (error) {
            console.log(error)
        }
    }
  return (
<>
<div className='my-container'>
                    <form method='POST' className='form-component'>
    <h3 className='form-title'>SignIn</h3>
        <input  onChange={handleChange}  placeholder="Enter Mail"  type="email"  value={email}  name="mail"  required/> 
        <input onChange={handleChange} placeholder="Enter Password" type="password" value={password} name="password" required/>
            <button className='my-button' value="login" onClick={handleSubmit}>Login</button>
    </form>
        </div>
</>
        )
    }
export default SignIn;
