
import React,{useContext, useState} from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Welcome from '../page/Welcome';
import Signup from './Signup';
import Login from './Login';
import { UserContext } from '../App';
import Edit from '../page/Edit';

function UserAuth() {
    const userContext = useContext(UserContext);

  
}

export default UserAuth