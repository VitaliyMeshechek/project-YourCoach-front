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
    name: 'аеробні програми',
    fitnessWeigth: '',
    fitnessStrength: '',
    fitnessWellness: '',
    description: '',
    training: '',
    location: '',
    comments: '',
    weigth: '',
    aerobic: '',
    strong: '',
    health: '',
    function: '',
    food: '',
    special: '',
    avatar: null,
    duration: 0,
    price: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPageTitle = useCallback(() => {
    if (step < 1) return 'Додавання програми';

    const titles = {
      'fitnes for women': 'Додавання жіночої програми',
      weigth: 'Додавання програми схуднення',
      'strength fitness': 'Додавання програми для силового фітнесу',
      'flexibility and wellness':
        'Додавання програми гнучкості та оздоровлення',
      '': 'Додавання програми',
    };

    return titles[formData.category] || 'Додавання програми';
  }, [formData.category, step]);

  useEffect(() => {
    setTitle(getPageTitle());
  }, [getPageTitle]);

  const steps = [
    'Вибрати категорію',
    'Деталі програми',
    'Додаткова інформація',
  ];

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
    newFormData.append('aerobic', formData.aerobic);
    newFormData.append('description', formData.description);
    newFormData.append('training', formData.training);
    newFormData.append('duration', formData.duration);
    newFormData.append('avatar', formData.avatar);

    if (formData.category === 'fitnes for women') {
      dispatch(addProgram(newFormData));
      toggleModal();
      return;
    }

    if (formData.comments) {
      newFormData.append('comments', formData.comments);
    }

    newFormData.append('category', formData.category);
    newFormData.append('fitnessWellness', formData.fitnessWellness);

    if (formData.category === 'flexibility and wellness') {
      dispatch(
        addNotice({ category: 'flexibility and wellness', newFormData })
      );
      toggleModal();
    }

    newFormData.append('category', formData.category);
    newFormData.append('fitnessStrength', formData.fitnessStrength);

    if (formData.category === 'strength fitness') {
      dispatch(addNotice({ category: 'strength fitness', newFormData }));
      toggleModal();
      return;
    }

    newFormData.append('category', formData.category);
    newFormData.append('fitnessWeigth', formData.fitnessWeigth);
    newFormData.append('special', formData.special);

    if (formData.category === 'weigth') {
      dispatch(addNotice({ category: formData.category, newFormData }));
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
            {step === 2 && (
              <AdditionalInfo
                formData={formData}
                setFormData={setFormData}
                backStep={handlePrevClick}
                submit={handleSubmit}
              />
            )}
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
