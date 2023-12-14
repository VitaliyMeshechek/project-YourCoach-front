import { useState, useEffect } from 'react';

import { AddFormButtonWrapper } from '../ProgramForm/ProgramForm.styled';
import AddFormButtonBack from '../AddFormButton/AddFormButtonBack';
import AddFormButtonNext from '../AddFormButton/AddFormButtonNext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { validateField } from '../ValidateProgramSchema';

import {
  AddFormInput,
  AddFormLabel,
  AddFormLabelWrapper,
} from '../ProgramDetails/ProgramDetails.styled';
import {
  AddFormTextArea,
  AddFormImageWrapper,
  AddFormImageLabel,
  FileInput,
  FirstPartFormWrapper,
  SecondPartFormWrapper,
  AdditionalInfoFormWrapper,
  AddFormTextAreaLabel,
} from './AdditionalInfo.styled.js';

const AdditionalInfo = ({ formData, setFormData, submit, backStep }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [imageValue, setImageValue] = useState('');
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const isAvatarURLFieldValid = Boolean(!errors.avatar && !!formData.avatar);
  const isCommentsFieldValid = Boolean(!errors.comments);
  const isLocationFieldValid = Boolean(!errors.location && !!formData.location);
  const isPriceFieldValid = Boolean(!errors.price && !!formData.price);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      formData.category === 'fitnes for women' &&
      formData.category === 'weigth' &&
      formData.category === 'strength fitness' &&
      formData.category === 'flexibility and wellness'
    ) {
      setIsDisabled(
        !(
          isAvatarURLFieldValid &&
          isLocationFieldValid &&
          isPriceFieldValid &&
          isCommentsFieldValid
        )
      );
    }
  }, [
    errors,
    formData.category,
    isCommentsFieldValid,
    isLocationFieldValid,
    isAvatarURLFieldValid,
    isPriceFieldValid,
  ]);

  const handleInputChange = e => {
    const { name, value, type, files } = e.target;
    const fieldValue = type === 'file' ? files[0] : value;

    if (type === 'file') {
      setImageValue(value);
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: fieldValue,
    }));
  };

  return (
    <>
      <AdditionalInfoFormWrapper category={formData.category}>
        <FirstPartFormWrapper category={formData.category}>
          <AddFormImageLabel
            htmlFor="program-image"
            category={formData.category}
          >
            {(formData.category === 'fitnes for women' &&
              formData.category === 'weigth' &&
              formData.category === 'strength fitness' &&
              formData.category === 'flexibility and wellness') ||
            viewportWidth < 768
              ? 'Add photo'
              : 'Load the pet’s image:'}
            <AddFormImageWrapper>
              {!formData.avatar && <BsPlus width="30" height="30" />}
              {!!formData.avatar && (
                <img
                  id="image"
                  src={URL.createObjectURL(formData.avatar)}
                  alt={formData.avatar.name}
                />
              )}
            </AddFormImageWrapper>
            <FileInput
              type="file"
              id="program-image"
              name="avatar"
              accept=".png, .jpg, .jpeg, .webp"
              onChange={handleInputChange}
              value={imageValue}
              onBlur={() => validateField('avatar', formData, setErrors)}
            />
          </AddFormImageLabel>
        </FirstPartFormWrapper>
        <SecondPartFormWrapper>
          <AddFormLabelWrapper>
            <AddFormLabel htmlFor="location">
              Місцезнаходження
              <AddFormInput
                placeholder="Type of location"
                type="text"
                name="location"
                onChange={handleInputChange}
                value={formData.location}
                onBlur={() => validateField('location', formData, setErrors)}
                className={errors.location ? 'invalid' : ''}
              />
            </AddFormLabel>
            {!!errors.location && <ErrorMessage message={errors.location} />}
          </AddFormLabelWrapper>
          <AddFormLabelWrapper>
            <AddFormLabel htmlFor="price">
              Ціна
              <AddFormInput
                placeholder="Type of price"
                type="number"
                name="price"
                onChange={handleInputChange}
                value={formData.price}
                onBlur={() => validateField('price', formData, setErrors)}
                className={errors.price ? 'invalid' : ''}
              />
            </AddFormLabel>
            {!!errors.price && <ErrorMessage message={errors.price} />}
          </AddFormLabelWrapper>
          <AddFormLabelWrapper>
            <AddFormTextAreaLabel htmlFor="comments">
              Коментарі
              <AddFormTextArea
                component="textarea"
                placeholder="Type comments"
                name="comments"
                onChange={handleInputChange}
                value={formData.comments}
                onBlur={() => validateField('comments', formData, setErrors)}
                className={errors.comments ? 'invalid' : ''}
              />
            </AddFormTextAreaLabel>
            {!!errors.comments && <ErrorMessage message={errors.comments} />}
          </AddFormLabelWrapper>
        </SecondPartFormWrapper>
      </AdditionalInfoFormWrapper>
      <AddFormButtonWrapper isMoreInfo={true} category={formData.category}>
        <AddFormButtonNext
          type="submit"
          text="Завершити"
          icon={<MdOutlineFitnessCenter />}
          filled={true}
          clickHandler={submit}
          isDisabled={isDisabled}
        />
        <AddFormButtonBack
          type="button"
          clickHandler={backStep}
          text="Назад"
          isLink={false}
        />
      </AddFormButtonWrapper>
    </>
  );
};

export default AdditionalInfo;
