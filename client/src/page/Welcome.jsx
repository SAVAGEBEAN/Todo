import Cookies from "js-cookie";
import React, { useContext } from "react";
import Cards from "../components/Cards";
import CreateTask from "../components/CreateTask";
import { UserContext } from "../App";

const Welcome = () => {
  const userContext = useContext(UserContext);
  const handleLogout = () => {
    Cookies.remove("user");
    window.location.reload(false);
  };

  return (
    <div className="">
      <div className="flex inline  justify-between shadow-lg">
        <p className="m-2 text-lg">Your Tasks</p>
        <span className="m-2">{userContext}</span>
            <button className="border  hover:border-dotted m-2 rounded-lg p-1.5 top-0 right-0" onClick={handleLogout}>
              Log Out
            </button>
      </div>
      <div>
        <div className="h-56">
          <CreateTask />
        </div>
        <Cards />
      </div>
    </div>
  );
};

export default Welcome;
