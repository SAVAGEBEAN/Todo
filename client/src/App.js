import './App.css';
import { createContext, useEffect, useState } from 'react';
import Routes from './components/userAuth';
import axios from 'axios';
import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
export const UserContext = createContext();
function App() {
  const [userSession, setUserSession] = useState(null);
  
  const getUser = async() =>{
    try{ 
      const user = Cookies.get('user');
      const response = await axios.post('http://localhost:5000/user',{user:user});
      if(response.status===200){
        setUserSession(response.data);
      } 
    }
    catch(error){
      if(error.status===401)setUserSession(false);
      console.log(error.response.data)
    }
  }
  const {isLoading,isError,error,mutate} = useMutation(getUser);

  useEffect(()=>{
    mutate();
  },[])
 
  return (
    <div className="App">
      <UserContext.Provider value={userSession}>
        {isLoading?"Loading...":isError?error:<Routes/>}
      </UserContext.Provider>
    </div>
  );
}

export default App;
