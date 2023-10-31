import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const LoggedOutNavbar = () => {
  return (
    <div className='flex'>
      <Link to='/signup' className='hover:underline'>
        <Button name={"Signup"}></Button>
      </Link>
      <Link to='/login' className='hover:underline'>
        <Button name={"Login"}></Button>
      </Link>
      <Link to='/plantcare' className=' hover:underline '>
        <Button name={"Plant Care Library"}></Button>
      </Link>
    </div>
  );
};

export default LoggedOutNavbar;
