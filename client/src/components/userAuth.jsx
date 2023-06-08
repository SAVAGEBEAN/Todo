
import React,{useContext, useState} from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Welcome from '../page/Welcome';
import Signup from './Signup';
import Login from './Login';
import { UserContext } from '../App';
import Edit from '../page/Edit';

function UserAuth() {
    const userContext = useContext(UserContext);
    const [id, setId] = useState('');
  return(
    <BrowserRouter>
    <Routes>
      {
        userContext?(
        <Route path='/' element={<Welcome/>}/>
        )
        : (<Route path='/' element={<Login/>}/>
        )
      }
      <Route path='/edit' element={<Edit/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default UserAuth