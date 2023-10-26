import React, { useContext } from 'react';
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
    <div className="flex">
      <button
        onClick={handleClick}
        className=" hover:underline"
      >
        Log Out
      </button>
      <Link to="/uplant" className="ml-6 hover:underline">
        User Plants
      </Link>
      <Link to="/uprofile" className="ml-6 hover:underline">
        User Profile
      </Link>
    </div>
  );
};

export default LoggedInNavbar;

