import { Logout } from './Logout';
import { CoachData } from './CoachData';
import {
  ContainerCoach,
  CoachPageContainer,
  Header,
  MyProgramHeaderContainer,
  CoachBlock,
  ProgramBlock,
} from './CoachPage.styled';

import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';

import { useState, useEffect } from 'react';
import { showModal } from '../../redux/modal/slice';
import { updateUser } from '../../redux/user/operations';
import { useAuth } from '../../hooks/useAuth';
import { ProgramData } from './ProgramData';
import AddProgramBtn from 'components/AddProgramBtn/AddProgramBtn';
import CongratsModal from 'components/ReusableComponents/ModalWindows/CongratsModal/CongratsModal';
import LeavingModal from 'components/ReusableComponents/ModalWindows/LeavingModal/LeavingModal';

export const CoachPageInfo = () => {
  const { user } = useAuth();
  const [isfirstLogin, setIsFirstLogin] = useState(user.firstLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isfirstLogin) {
      dispatch(showModal(false));
    } else {
      dispatch(showModal(true));
    }
  }, [isfirstLogin, dispatch]);

  const toggleModal = () => {
    dispatch(showModal(true));
  };

  const approveLogOut = async () => {
    await dispatch(logOut());
  };

  const toggleFirstLogin = () => {
    setIsFirstLogin(false);
    dispatch(updateUser({ firstLogin: 'false' }));
  };

  return (
    <div>
      {isfirstLogin && <CongratsModal func={toggleFirstLogin} />}
      {!isfirstLogin && <LeavingModal approveHandle={approveLogOut} />}

      <CoachPageContainer>
        <CoachBlock>
          <Header>Моя інформація</Header>

          <ContainerCoach>
            <CoachData />
            <Logout toggleModal={toggleModal} />
          </ContainerCoach>
        </CoachBlock>
        <ProgramBlock>
          <MyProgramHeaderContainer>
            <Header>Моя програма:</Header>
            <AddProgramBtn text="Додати програму" path="/add-program" />
          </MyProgramHeaderContainer>
          <ProgramData />
        </ProgramBlock>
      </CoachPageContainer>
    </div>
  );
};
