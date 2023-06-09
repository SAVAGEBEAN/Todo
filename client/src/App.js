import './App.css';
import React, { useEffect, useState } from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Welcome from './page/Welcome';
import Signup from './components/Signup';
import Login from './components/Login';
import Edit from './page/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken,selectEmail, verify } from './features/UserRedux';
import axios from 'axios';

function App() {
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail);
  console.log(selectEmail)
  const dispatch = useDispatch();
  const getEmail = async() =>{
    try{
      const response = await axios.post('http://localhost:5000/user/',{},{headers:{authToken:token}})
      console.log(response)
      dispatch(verify(response.data))
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{

    if (token){
        getEmail();
    }
  },[token])
  
  return(
    <BrowserRouter>
    <Routes>
        {email?<Route path='/' element={<Welcome/>}/>
        :<Route path='/' element={<Login/>}/>}
        <Route path='/edit' element={<Edit/>}/>
        
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App;
