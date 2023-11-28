import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from 'components/Header/AppBar/AppBar';

const SharedLayout = () => {
  return (
    <>
      <AppBar />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
