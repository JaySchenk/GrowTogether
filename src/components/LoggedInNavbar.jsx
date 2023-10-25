import { Button } from '@mantine/core';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SessionContext } from '../contexts/SessionContext';

const LoggedInNavbar = () => {
  const { setIsAuthenticated } = useContext(SessionContext);
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  }

  return (
    <>
      <Button onClick={handleClick} variant='subtle' color='cyan'>
        Log Out
      </Button>
      <Button component={Link} to='/uplant' variant='subtle' color='cyan'>
        User Plants
      </Button>
      <Button component={Link} to='/uprofile' variant='subtle' color='cyan'>
        User Profile
      </Button>
      <Button component={Link} to='/createplant' variant='subtle' color='cyan'>
        Create Plant
      </Button>
    </>
  );
};

export default LoggedInNavbar;
