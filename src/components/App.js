import { MainBackground } from './App.styled';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { refreshUser } from 'redux/auth/operations';
import SharedLayout from './SharedLayout/SharedLayout';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import CoachPage from 'pages/CoachPage/CoachPage';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import AddProgramPage from 'pages/AddProgramPage/AddProgramPage';
import CustomerPage from 'pages/CustomerPage/CustomerPage';
import OurCoachesList from './OurCoaches/OurCoachesList/OurCoachesList';
import { Loader } from 'Loader/Loader';

export const App = () => {
  const { isRefreshing } = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <MainBackground>
      <Routes>
        <Route path="/" element={<SharedLayout />}></Route>
        <Route path="notices" element={<CustomerPage />}>
          <Route index element={<Navigate to="/notices" />} />
          <Route path=":categoryName" element={<OurCoachesList />} />
        </Route>
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
