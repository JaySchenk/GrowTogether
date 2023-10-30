import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';
import Button from './Button';

const LoggedInNavbar = () => {
  const { setIsAuthenticated } = useContext(SessionContext);
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  }

  return (
    <div className='flex'>
      <Button name={'Log Out'} onClick={handleClick}></Button>
      <Link to='/uplant'>
        <Button name={'User Plants'}></Button>
      </Link>
      <Link to='/uprofile'>
        <Button name={'User Profile'}></Button>
      </Link>
<<<<<<< HEAD
      <Link to='/createplant'>
        <Button name={'Create Plant'}></Button>
      </Link>
=======
>>>>>>> 1b32ddee590b370cbbbbdb5f120286abff1de826
    </div>
  );
};

export default LoggedInNavbar;
