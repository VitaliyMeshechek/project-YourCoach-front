import { useState, useEffect, useCallback } from 'react';
import { Formik } from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  AddFormTitle,
  AddForm,
  AddFormList,
  AddFormItem,
  AddFormStepName,
} from './ProgramForm.styled';

import { addNotice } from 'redux/notices/operations';
// import { addMyPet } from 'redux/auth/operations';
import { addProgram } from 'redux/user/operations';

import { ValidateProgramSchema } from '../ValidateProgramSchema';
import Modal from '../../ModalMenu/ModalMenu';
import AddProgramModal from '../AddProgramModal/AddProgramModal';
// import AddModal from 'components/ReusableComponents/Modal/AddModal';

import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import ChooseCategory from '../ChooseCategory/ChooseCategory';
import ProgramDetails from '../ProgramDetails/ProgramDetails';

const AddProgramForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    training: '',
    location: '',
    comments: '',
    food: '',
    special: '',
    avatar: null,
    duration: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPageTitle = useCallback(() => {
    if (step < 1) return 'Add Program';

    const titles = {
      'fitnes for women': 'Add women program',
      weightLossProgram: 'Add program for weight loss',
      'strength fitness': 'Add program for strength fitness',
      'flexibility and wellnes': 'Add program for flexibility and wellnes',
      '': 'Add Program',
    };
    return titles[formData.category] || 'Add Program';
  }, [formData.category, step]);

  useEffect(() => {
    setTitle(getPageTitle());
  }, [getPageTitle]);

  const steps = ['Choose Category', 'Program Details', 'Additional Info'];

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const setClassName = index => {
    if (index > step) return '';
    if (index < step) return 'completed';
    return 'current';
  };

  const handleNextClick = e => {
    setStep(prevState => prevState + 1);
  };

  const handlePrevClick = () => {
    setStep(prevState => prevState - 1);
  };

  const handleSubmit = async () => {
    if (!formData.category) return;

    const newFormData = new FormData();
    newFormData.append('category', formData.category);
    newFormData.append('name', formData.name);
    newFormData.append('description', formData.description);
    newFormData.append('training', formData.training);
    newFormData.append('duration', formData.duration);
    newFormData.append('avatar', formData.avatar);

    if (formData.comments) {
      newFormData.append('comments', formData.comments);
    }

    if (formData.category === 'fitnes for women') {
      dispatch(addProgram(newFormData));
      toggleModal();
      return;
    }

    if (formData.category === 'flexibility and wellnes') {
      dispatch(addNotice({ category: 'lexibility and wellnes', newFormData }));
      toggleModal();
    }

    newFormData.append('category', formData.category);
    newFormData.append('special', formData.special);

    if (formData.category === 'weightLossProgram') {
      dispatch(addNotice({ category: 'weight Loss Program', newFormData }));
      toggleModal();
      return;
    }

    newFormData.append('category', formData.category);
    newFormData.append('food', formData.food);

    if (formData.category === 'strength fitness') {
      dispatch(addNotice({ category: 'strength fitness', newFormData }));
      toggleModal();
      return;
    }
  };

  return (
    <div step={step} category={formData.category}>
      <AddFormTitle>{title}</AddFormTitle>
      <AddFormList>
        {steps.map((stepName, index) => (
          <AddFormItem key={index} className={setClassName(index)}>
            <AddFormStepName>{stepName}</AddFormStepName>
          </AddFormItem>
        ))}
      </AddFormList>
      <Formik
        initialValues={formData}
        validationSchema={ValidateProgramSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {() => (
          <AddForm autoComplete="on">
            {step === 0 && (
              <ChooseCategory
                formData={formData}
                setFormData={setFormData}
                nextStep={handleNextClick}
                cancel={backLink}
              />
            )}
            {step === 1 && (
              <ProgramDetails
                formData={formData}
                setFormData={setFormData}
                nextStep={handleNextClick}
                backStep={handlePrevClick}
              />
            )}
            {/* {step === 2 && (
              <AdditionalInfo
                formData={formData}
                setFormData={setFormData}
                backStep={handlePrevClick}
                submit={handleSubmit}
              />
            )} */}
          </AddForm>
        )}
      </Formik>
      {isModalOpen && (
        <Modal toggleModal={() => navigate(backLink)}>
          <AddProgramModal backLink={backLink} category={formData.category} />
        </Modal>
      )}
    </div>
  );
};

export default AddProgramForm;
