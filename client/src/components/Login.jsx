import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { login } from "../features/UserRedux";
// import {store} from '../features/UserRedux';
const Login = () => {
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userdata,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/user/login", userdata)
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('token',response.data)
        dispatch(login(
          {token : response.data}
        ))
        window.location.reload(false)
      })
      .catch((error) => alert(error.response.data));
  };
  const { isLoading, isError, error, mutate } = useMutation(handleSubmit);
  return (
    <div className="top-50 ">
      <div className="flex top-50 place-content-center">

      <h1 className="text-2xl">Login</h1>
      </ div>
    <div className="flex justify-center flex-column">
      
      <div>
        <div>
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={userdata.email}
          onChange={handleChange}
          ></input>
          </div>
          <div>

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={userdata.password}
          onChange={handleChange}
          ></input>
          </div>
          <div>

        <button onClick={mutate}>Login</button>
          </div>
      </div>
      <div>{isLoading ? "Logging In..." : isError ? error : ""}</div>
    </div>
          </div>
  );
};

export default Login;
