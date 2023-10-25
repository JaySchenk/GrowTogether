import React from 'react';
import { Link } from 'react-router-dom';

const LoggedInNavbar = () => {
  return (
    <div className="flex">
      <Link to="/signup" className="ml-6 hover:underline">
        Signup
      </Link>
      <Link to="/login" className="ml-6 hover:underline">
        Login
      </Link>
    </div>
  );
};

export default LoggedInNavbar

