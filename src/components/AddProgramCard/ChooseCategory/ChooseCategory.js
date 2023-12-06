import { useState, useEffect } from 'react';

import { AddFormButtonWrapper } from '../ProgramForm/ProgramForm.styled';
import AddFormButtonBack from '../AddFormButton/AddFormButtonBack';
import AddFormButtonNext from '../AddFormButton/AddFormButtonNext';
import { MdOutlineFitnessCenter } from 'react-icons/md';

import {
  AddFormRadioButton,
  RadioCategoryLabel,
  CategoryWrapper,
} from './ChooseCategory.styled.js';

const ChooseCategory = ({
  formData,
  setFormData,
  nextStep,
  cancel,
  setValues,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!formData.category) setIsDisabled(true);
    else setIsDisabled(false);
  }, [formData.category]);

  const handleCategoryChange = e => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <CategoryWrapper>
      <AddFormRadioButton
        type="radio"
        name="category"
        value="fitnes for women"
        id="fitnes for women"
        onChange={handleCategoryChange}
        checked={formData.category === 'fitnes for women'}
      />
      <RadioCategoryLabel htmlFor="fitnes for women">
        Fitnes for women
      </RadioCategoryLabel>
      <AddFormRadioButton
        type="radio"
        name="category"
        value="weight loss program"
        id="weight loss program"
        checked={formData.category === 'weight loss program'}
        onChange={handleCategoryChange}
      />
      <RadioCategoryLabel htmlFor="Add program for weight loss">
        Weight loss program
      </RadioCategoryLabel>
      <AddFormRadioButton
        type="radio"
        name="category"
        value="strength fitness"
        id="strength fitness"
        checked={formData.category === 'strength fitness'}
        onChange={handleCategoryChange}
      />
      <RadioCategoryLabel htmlFor="strength fitness">
        Strength fitness
      </RadioCategoryLabel>
      <AddFormRadioButton
        type="radio"
        name="category"
        value="flexibility and wellnes"
        id="flexibility and wellnes"
        checked={formData.category === 'flexibility and wellnes'}
        onChange={handleCategoryChange}
      />
      <RadioCategoryLabel htmlFor="flexibility and wellnes">
        Flexibility and wellnes
      </RadioCategoryLabel>
      <AddFormButtonWrapper>
        <AddFormButtonNext
          isDisabled={isDisabled}
          type="button"
          text="Next"
          icon={
            <MdOutlineFitnessCenter
              style={{ stroke: '#FEF9F9', width: '24px', height: '24px' }}
            />
          }
          clickHandler={nextStep}
          filled={false}
        />
        <AddFormButtonBack text="Cancel" isLink={true} path={cancel} />
      </AddFormButtonWrapper>
    </CategoryWrapper>
  );
};

export default ChooseCategory;
