import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const LoggedInNavbar = () => {
  return (
    <div className='flex'>
      <Link to='/signup' className='ml-4 hover:underline'>
        <Button name={'Signup'}></Button>
      </Link>
      <Link to='/login' className='ml-4 hover:underline'>
        <Button name={'Login'}></Button>
      </Link>
    </div>
  );
};

export default LoggedInNavbar;
