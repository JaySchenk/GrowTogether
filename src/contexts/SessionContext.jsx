// Create and export your context
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const SessionContext = createContext();

// Create your provider component that will keep your state

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async (currentToken) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      if (response.ok) {
        setToken(currentToken);
        const decoded = jwt_decode(currentToken);
        setUserId(decoded.user);
        setIsAuthenticated(true);
        window.localStorage.setItem("authToken", currentToken);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem("authToken");
    if (tokenFromStorage) {
      handleLogin(tokenFromStorage);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchWithToken = async (endpoint, callback, method = "GET", body) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api${endpoint}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        const parsed = await response.json();
        callback(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SessionContext.Provider
      value={{
        userId,
        fetchWithToken,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        handleLogin,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
