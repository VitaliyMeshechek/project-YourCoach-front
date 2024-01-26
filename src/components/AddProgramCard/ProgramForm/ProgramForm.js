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
import { addUserProgram } from 'redux/user/operations';

import { ValidateProgramSchema } from '../ValidateProgramSchema';
import Modal from '../Modal/Modal';
import AddProgramModal from '../../ReusableComponents/ModalWindows/AddProgramModal/AddProgramModal';
// import AddModal from 'components/ReusableComponents/Modal/AddModal';

import AdditionalInfo from '../AdditionalInfo/AdditionalInfo';
import ChooseCategory from '../ChooseCategory/ChooseCategory';
import ProgramDetails from '../ProgramDetails/ProgramDetails';
import CongratsModal from 'components/ReusableComponents/ModalWindows/CongratsModal/CongratsModal';

const AddProgramForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    kind: '',
    description: '',
    fitnessWeigth: '',
    kindProgramWeigth: '',
    fitnessStrength: '',
    fitnessWellness: '',
    training: '',
    location: '',
    comments: '',
    food: '',
    special: '',
    avatar: '',
    duration: '',
    price: '',
    nameYourProgram: '',
    typeYourProgram: '',
    descriptionYourProgram: '',
  });
  const [dietName, setDietName] = useState([]);
  const [personName, setPersonName] = useState([]);
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
      'your program': 'Додавання індивідуальної програми',
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

  const handleNextClick = () => {
    setStep(prevState => prevState + 1);
  };

  const handlePrevClick = () => {
    setStep(prevState => prevState - 1);
  };

  const handleSubmit = async () => {
    if (!formData.category) return;

    const div = new FormData();
    const newFormData = new FormData();
    newFormData.append('category', formData.category);
    newFormData.append('name', formData.name);
    newFormData.append('kind', formData.kind);
    newFormData.append('description', formData.description);
    newFormData.append('duration', formData.duration);
    newFormData.append('training', personName);
    newFormData.append('avatar', formData.avatar);
    newFormData.append('location', formData.location);
    newFormData.append('price', formData.price);
    newFormData.append('comments', formData.comments);


    if (formData.category === 'fitnes for women') {
      dispatch(addNotice({ category: formData.category, newFormData}));
      toggleModal();
    }


    newFormData.delete('category', formData.category);
    newFormData.delete('name', formData.name);
    newFormData.delete('kind', formData.kind);
    
    newFormData.append('fitnessWeigth', formData.fitnessWeigth);
    newFormData.append('kindProgramWeigth', formData.kindProgramWeigth);
    newFormData.append('special', dietName);


    if (formData.category === 'weigth') {
      dispatch(addNotice({ category: formData.category, newFormData}));
      toggleModal();
      return;
    }

    newFormData.delete('fitnessWeigth', formData.fitnessWeigth);
    newFormData.delete('kindProgramWeigth', formData.kindProgramWeigth);
    newFormData.delete('special', dietName);
    newFormData.append('fitnessStrength', formData.fitnessStrength);
    newFormData.append('food', formData.food);

    if (formData.category === 'strength fitness') {
      dispatch(addNotice({ category: formData.category, newFormData}));
      toggleModal();
      return;
    }

    newFormData.delete('fitnessStrength', formData.fitnessStrength);
    newFormData.delete('food', formData.food);
    newFormData.append('fitnessWellness', formData.fitnessWellness);

    if (formData.category === 'flexibility and wellness') {
      dispatch(
        addNotice({ category: formData.category, newFormData })
      );
      toggleModal();
    }

    newFormData.delete('fitnessWellness', formData.fitnessWellness);
    newFormData.append('category', formData.category);
    newFormData.append('nameYourProgram', formData.nameYourProgram);
    newFormData.append('typeYourProgram', formData.typeYourProgram);

    if (formData.category === 'your program') {
      dispatch(addUserProgram(newFormData));
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
                dietName={dietName}
                setDietName={setDietName}
                personName={personName}
                setPersonName={setPersonName}
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
