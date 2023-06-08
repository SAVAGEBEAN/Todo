import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
function CreateTask() {
    const [data,setData] = useState({user:'',title:'',description:''});
    const handleChange = e =>{
        const {name,value} = e.target;
        setData({...data,[name]:value});
    }
    const handleSubmit=async()=>{
      if(data.title==='' || data.description===''){
        alert('Field should not be empty')
      }
      else{
        setData({...data,user:Cookies.get('user')});
        const res = await axios.post('http://localhost:5000/todo/create',data);
        console.log(res)
        if(res)window.location.reload(false)
      }
      }
      const {isLoading, isError, error, mutate} = useMutation(handleSubmit);
  return (
    <div className='flex justify-center'>
    <div className='justify-center align-center place-content-center justify-between flex-column m-3'>

      <div>
        
        <input className='m-2 border-2 w-60 rounded-md p-1.5' type='text' onChange={handleChange} placeholder='Title' name='title'/>
      </div>
      <div>
        <textarea className='m-2 border-2 w-60 rounded-md p-1.5' rows={3} style={{resize:'none'}} placeholder='Description' name='description' onChange={handleChange}/>
      </div>
      <div>
        {isLoading?'loading...':<button className='m-2 border-2 w-60 rounded-md p-1.5 hover:shadow-lg' onClick={mutate}>Create</button>}
        </div>
    </div>
    </div>
  )
}

export default CreateTask