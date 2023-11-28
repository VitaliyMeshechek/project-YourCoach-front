import { MainBackground } from './App.styled';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';

export const App = () => {
  return (
    <MainBackground>
      <Routes>
        <Route path="/" element={<SharedLayout />}></Route>
      </Routes>
    </MainBackground>
  );
};
