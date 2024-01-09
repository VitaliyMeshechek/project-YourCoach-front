import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import { selectNoticesError } from 'redux/notices/selectors';
// import { selectError } from 'redux/auth/selectors';

import AddFormButtonBack from '../../../AddProgramCard/AddFormButton/AddFormButtonBack';
import AddFormButtonNext from '../../../AddProgramCard/AddFormButton/AddFormButtonNext';
// import { PawPrintIcon } from 'shared/utils/icons';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { AddFormButtonWrapper } from '../../../AddProgramCard/ProgramForm/ProgramForm.styled';
import { AddFormModalWrapper } from './AddProgramModal.styled';

const AddProgramModal = ({ backLink, category }) => {
  const navigate = useNavigate();
  // const addMyPetError = useSelector(selectError);
  // const addPetError = useSelector(selectNoticesError);
  // const isError = Boolean(addMyPetError) || Boolean(addPetError);
  // const text = isError
  //   ? 'Something went wrong, please try again.'
  //   : 'Pet was successfully added!';

  const buttonText =
    category === 'your program'
      ? 'Перейти в свій профіль'
      : 'Перейти до всіх програм';
  const path =
    category === 'your program'
      ? '/user'
      : '/notices/fitnes for women' ||
        '/notices/weigth' ||
        '/notices/strength fitness' ||
        '/notices/flexibility and wellness';
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
