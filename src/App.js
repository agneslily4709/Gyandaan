import React from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SignUp from './Components/Signup';
import SignIn from './Components/Signin';
import Profile from './Components/Profile';
import Posts from './Pages/Posts';

const App = () => {
  
  return (     
    <>   
         <Router>
         <Header/>
        <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/signup" exact element={<SignUp/>}/>
        <Route path="/signin" exact element={<SignIn/>}/>
        <Route path="/profile" exact element={<Profile/>}/>
        <Route path="/posts" exact element={<Posts/>}/>
        </Routes>
        </Router>
        </>
  );
};

export default App;

