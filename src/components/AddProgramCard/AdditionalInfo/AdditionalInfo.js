import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { AddFormButtonWrapper } from '../ProgramForm/ProgramForm.styled';
import AddFormButtonBack from '../AddFormButton/AddFormButtonBack';
import AddFormButtonNext from '../AddFormButton/AddFormButtonNext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { MdOutlineFitnessCenter } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { validateField } from '../ValidateProgramSchema';
// import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
// import {styled} from '@mui/system';

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
  const isCommentsFieldValid = Boolean(!errors.comments && !!formData.coments);
  const isLocationFieldValid = Boolean(!errors.location && !!formData.location);
  const isPriceFieldValid = Boolean(!errors.price && !!formData.price);

  // const blue = {
  //   100: '#DAECFF',
  //   200: '#b6daff',
  //   400: '#3399FF',
  //   500: '#007FFF',
  //   600: '#0072E5',
  //   900: '#003A75',
  // };

  // const grey = {
  //   50: '#F3F6F9',
  //   100: '#E5EAF2',
  //   200: '#DAE2ED',
  //   300: '#C7D0DD',
  //   400: '#B0B8C4',
  //   500: '#9DA8B7',
  //   600: '#6B7A90',
  //   700: '#434D5B',
  //   800: '#303740',
  //   900: '#1C2025',
  // };

  // const Textarea = styled(BaseTextareaAutosize)(
  //   ({ theme }) => `
  //   width: 594px;
  //   font-family: 'IBM Plex Sans', sans-serif;
  //   font-size: 0.875rem;
  //   font-weight: 400;
  //   line-height: 1.5;
  //   padding: 8px 12px;
  //   border-radius: 10px;
  //   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  //   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  //   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  //   box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  //   &:hover {
  //     border-color: ${blue[400]};
  //   }

  //   &:focus {
  //     border-color: ${blue[400]};
  //     box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  //   }

  //   // firefox
  //   &:focus-visible {
  //     outline: 0;
  //   }
  // `,
  // )

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
      formData.category === 'flexibility and wellness' &&
      formData.category === 'your program'
    ) {
      setIsDisabled(
        !(
          isAvatarURLFieldValid &&
          isLocationFieldValid &&
          isPriceFieldValid &&
          isCommentsFieldValid
        )
      );
    } else {
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
      <AdditionalInfoFormWrapper>
        <FirstPartFormWrapper>
          <AddFormImageLabel
            htmlFor="program-image"
            // category={formData.category}
          >
            {/* {formData.category === 'your program' || viewportWidth < 768
              ? 'Додати фото'
              : 'Завантажте зображення:'} */}
            <AddFormImageWrapper>
              {!formData.avatar && <BsPlus size="90" />}
              {!!formData.avatar && (
                <img
                  id="image"
                  src={URL.createObjectURL(formData.avatar)}
                  alt={formData.avatar.name}
                  accept=".png, .jpg, .jpeg, .webp"
                />
              )}
            </AddFormImageWrapper>
            <FileInput
              type="file"
              id="program-image"
              name="avatar"
              onChange={handleInputChange}
              value={imageValue}
              onBlur={() => validateField('avatar', formData.avatar, setErrors)}
            />
          </AddFormImageLabel>
        </FirstPartFormWrapper>
        <SecondPartFormWrapper>
          <AddFormLabelWrapper>
            <FormControl
              htmlFor="location"
              sx={{
                display: 'flex',
              }}
            >
              <TextField
                id="location"
                label="Місцезнаходження"
                // variant="outlined"
                variant="filled"
                type="text"
                name="location"
                onChange={handleInputChange}
                InputProps={{
                  sx: { minWidth: 594 },
                }}
                value={formData.location}
                className={errors.location ? 'invalid' : ''}
              />
              {/* {!!formData.description &&
                   !errors.description ? (
                     <ErrorMessage message={errors.description} />
                   ) : null} */}
            </FormControl>
            {/* <AddFormLabel htmlFor="location">
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
            {!!errors.location && <ErrorMessage message={errors.location} />} */}
          </AddFormLabelWrapper>
          <AddFormLabelWrapper>
            <FormControl
              htmlFor="price"
              sx={{
                display: 'flex',
              }}
            >
              <TextField
                id="number"
                label="Ціна"
                // variant="outlined"
                variant="filled"
                type="number"
                name="price"
                onChange={handleInputChange}
                value={formData.price}
                InputProps={{
                  sx: { minWidth: 594 },
                }}
                onBlur={() => validateField('price', formData, setErrors)}
                className={errors.price ? 'invalid' : ''}
              />
              {/* {!!formData.description &&
                   !errors.description ? (
                     <ErrorMessage message={errors.description} />
                   ) : null} */}
            </FormControl>
            {/* <AddFormLabel htmlFor="price">
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
            {!!errors.price && <ErrorMessage message={errors.price} />} */}
          </AddFormLabelWrapper>
          <AddFormLabelWrapper>
          {/* <Textarea
          htmlFor="comments"
          label="Коментарі"
      maxRows={5}
      aria-label="maximum height"
      name="comments"
      value={formData.comments}
      placeholder="Maximum 5 rows"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua."
    /> */}
            <FormControl
              htmlFor="comments"
              sx={{
                display: 'flex',
              }}
            >
              <TextField
                id="comments"
                // component="textarea"
                label="Коментарі"
                // variant="outlined"
                variant="filled"
                name="comments"
                onChange={handleInputChange}
                InputProps={{
                  sx: { minWidth: 594 },
                }}
                value={formData.comments}
                onBlur={() => validateField('comments', formData, setErrors)}
                className={errors.comments ? 'invalid' : ''}
              />
              {!!formData.description &&
                   !errors.description ? (
                     <ErrorMessage message={errors.description} />
                   ) : null} 
            </FormControl> 
            {/* <AddFormTextAreaLabel htmlFor="comments">
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
            {!!errors.comments && <ErrorMessage message={errors.comments} />} */}
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
          // isDisabled={isDisabled}
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
