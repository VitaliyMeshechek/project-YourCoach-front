import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import { selectNoticesError } from 'redux/notices/selectors';
// import { selectError } from 'redux/auth/selectors';

import AddFormButtonBack from '../AddFormButton/AddFormButtonBack';
import AddFormButtonNext from '../AddFormButton/AddFormButtonNext';
// import { PawPrintIcon } from 'shared/utils/icons';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { AddFormButtonWrapper } from '../ProgramForm/ProgramForm.styled';
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
    category === 'fitnes for women' ? 'Go to profile' : 'Go to your adds';
  const path = category === 'fitnes for women' ? '/user' : '/notices/my-pets';
  return (
    <AddFormModalWrapper>
      <p>'Program was successfully added!'</p>
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
