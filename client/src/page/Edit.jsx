import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { selectToken } from '../features/UserRedux';
function Edit() {
    const token = useSelector(selectToken);
    const [todoData,setTodoData] = useState('');
    const [data,setData] = useState({todo_id:'',title:'',description:'',status:'pending'});
    const qp = new URLSearchParams(window.location.search);
    const id = qp.get('id')

    const getData = async()=>{
        try {
            const response = await axios.post('http://localhost:5000/todo/task',{todo_id:id},{headers:{authtoken:token}});
            setTodoData(response.data);
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(()=>{
        getData();
        setData({...data,todo_id:id});
    },[])

    const handleChange= (e) =>{
        const {name,value} = e.target;
        setData({...data,[name]:value})
        console.log(data)
    }
    const handleEdit = async() =>{
        console.log(data)
        const res = await axios.post('http://localhost:5000/todo/update',data,{headers:{authtoken:token}})
        if(res)window.location.reload(false)
    }
    const {mutate} = useMutation(handleEdit);
  return (
    <div className='flex flex-row justify-center align-baseline'>
        <div className='w-2/4'>

        <div className='flex-column block'>
     

            <span>Title :{todoData.title}</span>
            </div>
            <div>
            <span>Description :{todoData.description}</span>
            </div>
            <div>
            <span>Status :{todoData.status}</span>
            </div>
        
        </div>
        <div>
            <div>

        <input type="text" name="title" onChange={handleChange} placeholder="Enter Title"/>
            </div>
            <div>

        <input type="text" name="description" onChange={handleChange} placeholder="Enter Description"/>
            </div>
            <div>

        Status : <input type='checkbox' onChange={e=>e.target.checked?setData({...data,status:'completed'}):setData({...data,status:''})} defaultChecked={false} name='status' />
            </div>
        
        <button onClick={mutate}>Edit</button>
        </div>
    </div>
  )
}

export default Edit
