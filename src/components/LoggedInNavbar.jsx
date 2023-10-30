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
      <Button name={"Log Out"} onClick={handleClick}></Button>
      <Link to='/uplant'>
        <Button name={"User Plants"}></Button>
      </Link>
      <Link to='/uprofile'>
        <Button name={"User Profile"}></Button>
      </Link>
      <Link to='/createplant'>
        <Button name={"Create Plant"}></Button>
      </Link>
      <Link to='/plantcare' className=' hover:underline'>
        <Button name={"Plant Care Library"}></Button>
      </Link>
    </div>
  );
};

export default LoggedInNavbar;
