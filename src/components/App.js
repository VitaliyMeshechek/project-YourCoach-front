import { MainBackground } from './App.styled';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import CoachPage from 'pages/CoachPage/CoachPage';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import AddProgramPage from 'pages/AddProgramPage/AddProgramPage';

export const App = () => {
  return (
    <MainBackground>
      <Routes>
        <Route path="/" element={<SharedLayout />}></Route>
        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/user" component={<RegisterPage />} />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/user" component={<LoginPage />} />
          }
        />
        <Route
          path="user"
          element={
            <PrivateRoute redirectTo="/login" component={<CoachPage />} />
          }
        />
        <Route
          path="add-program"
          element={
            <PrivateRoute
              redirectTo="/notices"
              component={<AddProgramPage />}
            />
          }
        />
      </Routes>
    </MainBackground>
  );
};
