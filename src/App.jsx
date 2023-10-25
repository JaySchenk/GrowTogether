import { AppShell, Box, Button, Header } from '@mantine/core';
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

function App() {
  const { isAuthenticated, isLoading } = useContext(SessionContext);
  useEffect(() => {}, [isAuthenticated]);

  return (
    // <AppShell
    //   padding='md'
    //   header={
    //     <Header
    //       height={60}
    //       p='xs'
    //       sx={{ display: 'flex', justifyContent: 'space-between' }}
    //     >
    //       <Button component={Link} to='/' variant='subtle' color='cyan'>
    //         Home
    //       </Button>
    //       <Box>
    //         {isAuthenticated && !isLoading ? (
    //           <LoggedInNavbar />
    //         ) : (
    //           <LoggedOutNavbar />
    //         )}
    //         <Button
    //           component={Link}
    //           to='/plantcare'
    //           variant='subtle'
    //           color='cyan'
    //         >
    //           Plant Care Library
    //         </Button>
    //       </Box>
    //     </Header>
    //   }
    // >
      <Routes>
        {/* Add some new route(s) on what you want to work, don't forget to make a PrivateRoute component */}
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
    // </AppShell>
  );
}

export default App;
