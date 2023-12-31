import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserPlantPage from "./pages/UserPlantPage";
import UserProfilePage from "./pages/UserProfilePage";
import PlantCarePage from "./pages/PlantCarePage";
import CreatePlant from "./pages/CreatePlant";
import PlantLibrary from "./pages/PlantLibrary";
import PrivateRoute from "./components/PrivateRoute";
import { SessionContext } from "./contexts/SessionContext";
import { useContext, useEffect } from "react";
import LoggedInNavbar from "./components/LoggedInNavbar";
import LoggedOutNavbar from "./components/LoggedOutNavbar";
import Logo from "/logo.png"
import UpdatePlantPage from "./pages/UpdatePlantPage";
// import { AiFillHome } from "react-icons/ai";

function App() {
  const { isAuthenticated, isLoading } = useContext(SessionContext);
  useEffect(() => {}, [isAuthenticated]);

  return (
    <div>
      <header className=' sticky top-0 p-8 flex justify-between items-center h-16 max-sm:hidden'>
        <Link to='/'>
          <img src={Logo} alt="logo" className="w-40" />
        </Link>
        <div className='w-2/3 flex justify-end'>
          {isAuthenticated && !isLoading ? (
            <LoggedInNavbar />
          ) : (
            <LoggedOutNavbar />
          )}
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
        <Route
          path='/updateplant/:plantId'
          element={
            <PrivateRoute>
              <UpdatePlantPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
