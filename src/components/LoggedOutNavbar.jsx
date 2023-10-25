import { AppShell, Box, Button, Header } from '@mantine/core';
import { Link, Route, Routes } from 'react-router-dom';

const LoggedInNavbar = () => {
  return (
    <>
      <Button component={Link} to='/signup' variant='subtle' color='cyan'>
        Signup
      </Button>
      <Button component={Link} to='/login' variant='subtle' color='cyan'>
        Login
      </Button>
    </>
  );
};

export default LoggedInNavbar;
