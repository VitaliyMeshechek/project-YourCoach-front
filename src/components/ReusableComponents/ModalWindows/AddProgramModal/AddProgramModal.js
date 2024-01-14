import { useNavigate } from 'react-router-dom';

import AddFormButtonBack from '../../../AddProgramCard/AddFormButton/AddFormButtonBack';
import AddFormButtonNext from '../../../AddProgramCard/AddFormButton/AddFormButtonNext';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { AddFormButtonWrapper } from '../../../AddProgramCard/ProgramForm/ProgramForm.styled';
import { AddFormModalWrapper } from './AddProgramModal.styled';

const AddProgramModal = ({ backLink, category }) => {
  const navigate = useNavigate();

  const buttonText =
    category === 'your program'
      ? 'Перейти в свій профіль'
      : 'Перейти до всіх програм';
  const
    path = category === 'your program'
    ? '/user'
    : null ||
      (category === 'fitnes for women'
        ? '/notices/fitnes for women'
        : null) ||
      (category === 'weigth' ? '/notices/weigth' : null) ||
      (category === 'strength fitness'
        ? '/notices/strength fitness'
        : null) ||
      (category === 'flexibility and wellness'
        ? '/notices/flexibility and wellness'
        : null);
  return (
    <AddFormModalWrapper>
      <p>'Програма була успішно додана!'</p>
      <AddFormButtonWrapper>
        <AddFormButtonNext
          type="button"
          text={buttonText}
          icon={
            <MdOutlineFitnessCenter
              style={{ stroke: '#FEF9F9', width: '24px', height: '24px' }}
            />
          }
          clickHandler={() => {
            navigate(path);
          }}
          filled={false}
          isDisabled={false}
        />
        <AddFormButtonBack
          type="button"
          clickHandler={() => navigate(backLink)}
          text="Back"
          isLink={false}
        />
      </AddFormButtonWrapper>
    </AddFormModalWrapper>
  );
};

export default AddProgramModal;
