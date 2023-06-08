import React, {useState} from 'react'
import {useMutation} from 'react-query';
import axios from 'axios';
const Signup = ()=>{
    const [userdata, setUserdata] = useState({email:"", password:""});

    const handleChange = e=>{
        const {name,value} = e.target;
        setUserdata({
            ...userdata,
            [name]:value
        })
        console.log(userdata);
    }
    const handleSubmit = async e =>{
        e.preventDefault();
        if(userdata.email && userdata.password){
                const response = await axios.post('http://localhost:5000/user/signup',userdata);
                console.log(response.data);
                setUserdata({email:"",password:""})
        }
        else{
            console.log("Invalid Input")
        }
    }
    const {isLoading, isError, error, mutate} = useMutation(handleSubmit);
  return (
    <div className='flex justify-center align-middle border h-screen'>
        <div className='top-2/4 relative'>

        <h1 className='text-2xl'>Register</h1>
        <div>
            <form>
                <br></br>
                <ul>
                    <li><input placeholder='Email address' type='email' name='email' value={userdata.email} onChange={handleChange}className='block w-full rounder-md '/></li>
                    <li><input placeholder='Password' type='password' name='password' value={userdata.password} onChange={handleChange}/></li>
                    <li className=''><button onClick={mutate} className='border-solid'>Signup</button></li>
                </ul>
            </form>
            <div>
                {
                    isLoading?"Saving..": ""
                }
                {
                    isError?error.message: ""
                }
            </div>
        </div>
    </div>
                </div>
  )
}

export default Signup