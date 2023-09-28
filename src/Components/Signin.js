import React, { useState } from 'react';
import '../styles.css';
import { auth, db } from '../imp';
import { updateDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      // Disable the submit button during authentication
      // Optionally, you can add a loading state here
      // to indicate that authentication is in progress
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Update Firestore document upon successful sign-in
      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      });

      // Clear the form and navigate to a specific page
      setData({ email: '', password: '' });
      navigate('/dashboard'); // Redirect to the dashboard or any desired page
    } catch (error) {
      setError('Authentication failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <div className='my-container'>
      <form method='POST' className='form-component'>
        <h3 className='form-title'>SignIn</h3>
        <input
          onChange={handleChange}
          placeholder='Enter Mail'
          type='email'
          value={data.email}
          name='email'
          required
        />
        <input
          onChange={handleChange}
          placeholder='Enter Password'
          type='password'
          value={data.password}
          name='password'
          required
        />
        {error && <p className='error-message'>{error}</p>}
        <button className='my-button' value='login' onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
