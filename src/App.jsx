<<<<<<< HEAD
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserPlantPage from './pages/UserPlantPage';
import UserProfilePage from './pages/UserProfilePage';
import PlantCarePage from './pages/PlantCarePage';
import CreatePlant from './pages/CreatePlant';
import PlantLibrary from './pages/PlantLibrary';
import PrivateRoute from './components/privateRoute';
import { SessionContext } from './contexts/SessionContext';
import { useContext, useEffect } from 'react';
import LoggedInNavbar from './components/LoggedInNavbar';
import LoggedOutNavbar from './components/LoggedOutNavbar';
import Button from './components/Button';
import { AiFillHome } from 'react-icons/ai';
=======
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPlantPage from "./pages/UserPlantPage";
import UserProfilePage from "./pages/UserProfilePage";
import PlantCarePage from "./pages/PlantCarePage";
import CreatePlant from "./pages/CreatePlant";
import PlantLibrary from "./pages/PlantLibrary";
import PrivateRoute from "./components/privateRoute";
import { SessionContext } from "./contexts/SessionContext";
import { useContext, useEffect } from "react";
import LoggedInNavbar from "./components/LoggedInNavbar";
import LoggedOutNavbar from "./components/LoggedOutNavbar";
>>>>>>> 1b32ddee590b370cbbbbdb5f120286abff1de826

function App() {
  const { isAuthenticated, isLoading } = useContext(SessionContext);
  useEffect(() => {}, [isAuthenticated]);

  return (
    <div>
      <header className=' sticky top-0 p-8 flex justify-between items-center h-16'>
        <Link to='/'>
          <Button name={'Home Page'}>
            <AiFillHome />
          </Button>
        </Link>
<<<<<<< HEAD
        <div className='w-2/3 flex justify-end'>
=======
        <div className="w-2/3 flex justify-end">
>>>>>>> 1b32ddee590b370cbbbbdb5f120286abff1de826
          {isAuthenticated && !isLoading ? (
            <LoggedInNavbar />
          ) : (
            <LoggedOutNavbar />
          )}
<<<<<<< HEAD
          <Link to='/plantcare' className=' hover:underline ml-4'>
            <Button name={'Plant Care Library'}></Button>
=======
          <Link to="/plantcare" className=" hover:underline ml-6">
            Plant Care Library
>>>>>>> 1b32ddee590b370cbbbbdb5f120286abff1de826
          </Link>
        </div>
      </header>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/plantcare' element={<PlantLibrary />} />
        <Route
          path='/uplant'
          element={
            <PrivateRoute>
              <UserPlantPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/uprofile'
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route path='/plantcare/:plantCareId' element={<PlantCarePage />} />
        <Route
          path='/createplant'
          element={
            <PrivateRoute>
              <CreatePlant />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
