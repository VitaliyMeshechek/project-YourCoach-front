import {
  Title,
  Description,
  PrimaryButton,
  IconPaw,
  PrimaryButtonText,
} from '../CongratsModal/CongratsModal.styled';

import { useDispatch } from 'react-redux';
import { showModal } from 'redux/modal/slice';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

const CongratsModal = ({ func }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showModal(false));

    func();
  };
  return (
    <>
      <ModalWrapper>
        <Title>Вітаю!</Title>
        <Description>Ви успішно зареєструвалися</Description>
        <PrimaryButton onClick={handleClose}>
          <PrimaryButtonText>Перейти в профіль</PrimaryButtonText>
          <IconPaw />
        </PrimaryButton>
      </ModalWrapper>
    </>
  );
};

export default CongratsModal;
