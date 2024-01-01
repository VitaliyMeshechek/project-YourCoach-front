import { ButtonLogout } from './CoachPage.styled';
import { FiLogOut } from 'react-icons/fi';

export const Logout = ({ toggleModal }) => {
  return (
    <ButtonLogout type="button" onClick={toggleModal}>
      <FiLogOut
        style={{
          rotate: '180deg',
          width: '22px',
          height: '21px',
          marginRight: '16px',
        }}
      />
      Вийти
    </ButtonLogout>
  );
};
