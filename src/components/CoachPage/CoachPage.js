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
// import AddPetBtn from '../AddPetBtn/AddPetBtn';
import { useState, useEffect } from 'react';
// import CongratsModal from 'components/ReusableComponents/Modal/CongratsModal';
// import LeavingModal from 'components/ReusableComponents/Modal/LeavingModal';
import { showModal } from '../../redux/modal/slice';
import { updateUser } from '../../redux/user/operations';
import { useAuth } from '../../hooks/useAuth';
import { ProgramData } from './ProgramData';

export const CoachPageInfo = () => {
  const { user } = useAuth();
  const [firstLog, setfirstLog] = useState(user.firstLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!firstLog) {
      dispatch(showModal(false));
    } else {
      dispatch(showModal(true));
    }
  }, [firstLog, dispatch]);

  const toggleModal = () => {
    dispatch(showModal(true));
  };

  //   const approveLogOut = async () => {
  //     await dispatch(logOut());
  //   };

  //   const toggleFirstLogin = () => {
  //     setfirstLog(false);
  //     dispatch(updateUser({ firstLogin: 'false' }));
  //   };

  return (
    <div>
      {/* {firstLog && <CongratsModal func={toggleFirstLogin} />}
      {!firstLog && <LeavingModal approveHandle={approveLogOut} />} */}

      <CoachPageContainer>
        <CoachBlock>
          <Header>Моя інформація:</Header>

          <ContainerCoach>
            <CoachData />
            <Logout toggleModal={toggleModal} />
          </ContainerCoach>
        </CoachBlock>
        <ProgramBlock>
          <MyProgramHeaderContainer>
            <Header>Моя програма:</Header>

            {/* <AddPetBtn text="Add pet" path="/add-pet" /> */}
          </MyProgramHeaderContainer>

          <ProgramData />
        </ProgramBlock>
      </CoachPageContainer>
    </div>
  );
};
