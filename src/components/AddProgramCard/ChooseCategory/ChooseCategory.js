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

const ChooseCategory = ({ formData, setFormData, nextStep, cancel }) => {
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
        Фітнес для жінок
      </RadioCategoryLabel>
      <AddFormRadioButton
        type="radio"
        name="category"
        value="weigth"
        id="weigth"
        checked={formData.category === 'weigth'}
        onChange={handleCategoryChange}
      />
      <RadioCategoryLabel htmlFor="weigth">
        Програма схуднення
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
        Силовий фітнес
      </RadioCategoryLabel>
      <AddFormRadioButton
        type="radio"
        name="category"
        value="flexibility and wellness"
        id="flexibility and wellness"
        checked={formData.category === 'flexibility and wellness'}
        onChange={handleCategoryChange}
      />
      <RadioCategoryLabel htmlFor="flexibility and wellness">
        Гнучкість та оздоровлення
      </RadioCategoryLabel>
      <AddFormRadioButton
        type="radio"
        name="category"
        value="your program"
        id="your program"
        checked={formData.category === 'your program'}
        onChange={handleCategoryChange}
      />
      <RadioCategoryLabel htmlFor="your program">
        Індивідуальна програма
      </RadioCategoryLabel>
      <AddFormButtonWrapper>
        <AddFormButtonNext
          isDisabled={isDisabled}
          type="button"
          text="Далі"
          icon={
            <MdOutlineFitnessCenter
              style={{ fill: '#ffff00', width: '20px', height: '20px' }}
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
