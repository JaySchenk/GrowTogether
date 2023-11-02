import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import Button from "./Button";

const LoggedInNavbar = () => {
  const { setIsAuthenticated } = useContext(SessionContext);
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("authToken");
    console.log("pressed");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <div className='flex'>
      <button className='hover:bg-sky-950 bg-sky-900 text-white text-sm py-2 px-3 rounded-full m-2' onClick={handleClick}>Log Out</button>
      <Link to='/uplant'>
        <Button name={"User Plants"}></Button>
      </Link>
      <Link to='/uprofile'>
        <Button name={"User Profile"}></Button>
      </Link>
      <Link to='/plantcare' className=' hover:underline'>
        <Button name={"Plant Care Library"}></Button>
      </Link>
    </div>
  );
};

export default LoggedInNavbar;
