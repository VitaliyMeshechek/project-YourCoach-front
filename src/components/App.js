import { MainBackground } from './App.styled';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';
// import { AnimatorsPage } from 'pages/Animators/AnimatorsPage';

export const App = () => {
  return (
    <MainBackground>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route path="/animators" element={<AnimatorsPage />} /> */}
        </Route>
      </Routes>
    </MainBackground>
  );
};
