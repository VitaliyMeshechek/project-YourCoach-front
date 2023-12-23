import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'components/ReusableComponents/MainContainer/MainContainer.styled';
import { OurCoaches } from 'components/Notices/CategoriesNav/CategoriesNav';
import { Title, Wrapper } from './CustomerPage.styled';

const CustomerPage = () => {
  return (
    <Container>
      <Title>Наші тренери</Title>
      {/* <CoachSearch /> */}
      <Wrapper>
        <OurCoaches />
        {/* <TabletWrapper>
        </TabletWrapper> */}
      </Wrapper>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default CustomerPage;
