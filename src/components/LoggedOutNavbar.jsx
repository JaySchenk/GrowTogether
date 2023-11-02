import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const LoggedOutNavbar = () => {
  return (
    <div className='flex'>
      <Link to='/signup' className='hover:underline'>
      <button className='hover:bg-sky-950 bg-sky-900 text-white text-sm py-2 px-3 rounded-full m-2'>Sign up</button>
      </Link>
      <Link to='/login' className='hover:underline'>
      <button className='hover:bg-sky-700 bg-sky-600 text-white text-sm py-2 px-3 rounded-full m-2'>Log in</button>
      </Link>
      <Link to='/plantcare' className=' hover:underline '>
        <Button name={"Plant Care Library"}></Button>
      </Link>
    </div>
  );
};

export default LoggedOutNavbar;
