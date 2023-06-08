import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function Cards() {
  let [currentPage,setCurrentPage] = useState(1);
  const [todolist, setTodolist] = useState("");
  const [cardsLen, setcardsLen] = useState(todolist.length);
  const [prevStatus,setprevStatus] = useState(false);
  const [maxPage, setmaxPage] = useState(1);
  const [nextStatus, setnextStatus] = useState(currentPage==maxPage?false:true);

  const [search,setSearch] = useState('');
  
  const searchTask = async()=>{
    try {
      const response = await axios.post('http://localhost:5000/todo/search',{user:Cookies.get('user'),title:search})
      setTodolist(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    searchTask();
  },[search])

  const maxpage = ()=>{
    let i = Math.ceil(cardsLen/9);
    setmaxPage(i);
  }
 
  const getData = async () => {
    try {
      const user = Cookies.get("user");
      const response = await axios.post("http://localhost:5000/todo/allTask", {
        user: user,
      });
      setTodolist(response.data);
      setcardsLen(response.data.length)
      // console.log(todolist)
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const goPrevious=()=>{
    setCurrentPage(currentPage-1)
  }
  const goNext=()=>{
    setCurrentPage(currentPage+1);
  } 
  useEffect(()=>{
    setprevStatus(currentPage==1?true:false);
    setnextStatus(currentPage==maxPage?true:false);
  },[currentPage,maxPage]);

  useEffect(() => {
    getData();
  }, [search==='']);
  
  useEffect(()=>{ 
    maxpage();
  },[cardsLen])

  useEffect(()=>{
    setcardsLen(todolist.length)
  },[todolist])
  return (
    <div className="">
    <div className="m-2 flex ml-8">
            <input className="m-2 p-2 w-60 border" type="text" name="search" placeholder="Enter Title" onChange={e=>setSearch(e.target.value)}/>
        </div>
    <div className="container mx-auto justify-center">
      <div className="grid lg:grid-cols-3">
        {todolist
          ? todolist.slice(9*(currentPage-1),9*currentPage).map((data, key = data._id) => {

              return (
                <div key={key} className="hover:shadow-lg cursor-pointer border card rounded-one w-80 h-56 p-2 m-8">
                  <a href={"http://localhost:3000/edit?id="+data._id} target="_blank">
                  <h1 className="text-center text-2xl font-bold">
                    {data.title}
                  </h1>
                  <div className="h-32 m-2 border rounded-md p-1">
                    <p className="">{data.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={data.status==='Pending'?"text-red-600":'text-green-600'}>{data.status}</div> 
                    <div className="m-1 ">
                    </div>
                  </div>
                      </a>
                </div>
              );
            })
          : "Loading..."}
      </div>
      <div className="flex justify-center">
        <button name="previous" className="" disabled={prevStatus} onClick={goPrevious}>{'<'}</button>
        <span>{currentPage}</span>
        <button name="next" disabled={nextStatus} onClick={goNext}>{'>'}</button>
      </div>
    </div>
    </div>
  );
}

export default Cards;
