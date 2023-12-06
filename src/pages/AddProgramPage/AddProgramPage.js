import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AddFormWrapper } from './AddProgramPage.styled';
import AddProgramForm from '../../components/AddProgramCard/ProgramForm/ProgramForm';
const AddProgramPage = () => {
  return (
    <>
      <AddFormWrapper>
        <AddProgramForm />
      </AddFormWrapper>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default AddProgramPage;
