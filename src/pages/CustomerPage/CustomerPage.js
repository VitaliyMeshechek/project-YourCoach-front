import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'components/ReusableComponents/MainContainer.styled';
import { Title, Wrapper } from './CustomerPage.styled';
import { OurCoachesByCategoriesNav } from 'components/OurCoaches/OurCoachesByCategoriesNav';

const CustomerPage = () => {
  return (
    <Container>
      <Title>Наші тренери</Title>
      {/* <CoachSearch /> */}
      <Wrapper>
        <OurCoachesByCategoriesNav />
      </Wrapper>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default CustomerPage;
