import ModalApproveAction from '../ModalApproveAction/ModalApproveAction';
import {
  Title,
  Description,
  DescriptionAccent,
} from './RemoveCoachProgramDetailsModal.styled';

const RemoveCoachProgramDetailsModal = ({ approveHandle, title }) => {
  return (
    <ModalApproveAction icon="TrashIcon" approveHandle={approveHandle}>
      <Title>Ви бажаєте видалити програму тренера?</Title>
      <Description>
        Ви впевненні що хочете видалити
        <DescriptionAccent> {title} </DescriptionAccent>
        ?
        <br />
        Ви не зможете скасувати цю дію.
      </Description>
    </ModalApproveAction>
  );
};

export default RemoveCoachProgramDetailsModal;
