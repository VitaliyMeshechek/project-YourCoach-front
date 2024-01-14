import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import { Title } from './LeavingModal.styled';

const LeavingModal = ({ approveHandle }) => {
  return (
    <ModalApproveAction icon="ExitIcon" approveHandle={approveHandle}>
      <Title>До скорої зустрічі!</Title>
    </ModalApproveAction>
  );
};

export default LeavingModal;
