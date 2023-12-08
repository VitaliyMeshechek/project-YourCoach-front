import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';

import { AddFormButtonWrapper } from '../ProgramForm/ProgramForm.styled';
import AddFormButtonBack from '../AddFormButton/AddFormButtonBack';
import AddFormButtonNext from '../AddFormButton/AddFormButtonNext';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { MdOutlineFitnessCenter } from 'react-icons/md';

import {
  ProgramFormWrapper,
  AddFormLabel,
  AddFormInput,
  AddFormLabelWrapper,
} from '../../AddProgramCard/ProgramDetails/ProgramDetails.styled';

import { validateField } from '../ValidateProgramSchema';

const ProgramDetailsForWeigth = ({
  formData,
  setFormData,
  nextStep,
  backStep,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [personName, setPersonName] = useState([]);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const isNameFieldValid = Boolean(!errors.name && !!formData.name);
  const isDescriptionFieldValid = Boolean(
    !errors.description && !!formData.description
  );
  const isDurationFieldValid = Boolean(!errors.duration && !!formData.duration);
  const isTrainingFieldValid = Boolean(!errors.training && !!formData.training);

  useEffect(() => {
    if (formData.category === 'fitnes for women') {
      setIsDisabled(
        !(
          isNameFieldValid &&
          isDescriptionFieldValid &&
          isDurationFieldValid &&
          isTrainingFieldValid
        )
      );
    }
  }, [
    errors,
    formData.category,
    isDescriptionFieldValid,
    isDurationFieldValid,
    isNameFieldValid,
    isTrainingFieldValid,
  ]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = ['Персональні тренування', 'Групові тренування'];

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setErrors(prevState => ({ ...prevState, [name]: '' }));

    // const inputValue = name === value;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <ProgramFormWrapper>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 494,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="name-label-weight loss program">
            Назва програми
          </InputLabel>
          <Select
            labelId="name-label-weight loss program"
            id="name-select-weight loss program"
            placeholder="Програма схуднення"
            type="text"
            name="nameWeightloss"
            onChange={handleInputChange}
            value={formData.nameWeightloss}
          >
            <MenuItem value={1}>Аеробіка</MenuItem>
            <MenuItem value={2}>Аеробний фітнес</MenuItem>
          </Select>
          {!!errors.name && <ErrorMessage message={errors.name} />}
        </FormControl>

        {/* <FormControl fullWidth>
                <InputLabel id="name-label-strength fitness">
                  Назва програми
                </InputLabel>
                <Select
                  labelId="name-label-strength fitness"
                  id="name-select-strength fitness"
                  placeholder="Силовий фітнес"
                  type="text"
                  name="name2"
                  onChange={handleInputChange}
                  value={formData.name2}
                  // onBlur={() => validateField('name', formData, setErrors)}
                  // className={errors.name ? 'invalid' : ''}
                >
                  <MenuItem value={1}>Body Up</MenuItem>
                  <MenuItem value={2}>Body Low</MenuItem>
                  <MenuItem value={3}>Body Pump</MenuItem>
                  <MenuItem value={4}>Body Sculpt</MenuItem>
                  <MenuItem value={5}>ABS</MenuItem>
                </Select>
                {!!errors.name && <ErrorMessage message={errors.name} />}
              </FormControl>  */}
        {/* <AddFormLabelWrapper>
        <AddFormLabel htmlFor="name">
          Назва програми
          <AddFormInput
            placeholder="Fitness for women"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            onBlur={() => validateField('name', formData, setErrors)}
            className={errors.name ? 'invalid' : ''}
          />
        </AddFormLabel>
        {!!errors.name && <ErrorMessage message={errors.name} />}
      </AddFormLabelWrapper> */}
        <TextField
          id="outlined-basic"
          label="Опис"
          variant="outlined"
          type="text"
          name="description"
          onChange={handleInputChange}
          value={formData.description}
          sx={{
            marginTop: 4,
            minWidth: 494,
          }}
        />

        {/* <AddFormLabelWrapper>
        <AddFormLabel htmlFor="description">
          Опис
          <AddFormInput
            type="text"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
            onBlur={() => validateField('description', formData, setErrors)}
            className={errors.description ? 'invalid' : ''}
          />
        </AddFormLabel>
        {!!errors.description && <ErrorMessage message={errors.description} />}
      </AddFormLabelWrapper> */}
        <FormControl>
          <FormLabel
            id="duration-label"
            sx={{
              marginTop: 4,
              minWidth: 494,
            }}
            helperText={
              !!errors.duration && <ErrorMessage message={errors.duration} />
            }
          >
            Тривалість
          </FormLabel>
          <RadioGroup
            aria-labelledby="duration-label"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="one week"
              control={<Radio />}
              label="1-4 тижнів"
            />
            <FormControlLabel
              value="five weeks"
              control={<Radio />}
              label="5-8 тижнів"
            />
            <FormControlLabel
              value="nine weeks"
              control={<Radio />}
              label="9-12 тижнів"
            />
            <FormControlLabel
              value="twelve weeks"
              control={<Radio />}
              label="12-15 тижнів"
            />
            <FormControlLabel
              value="more than twelve weeks"
              control={<Radio />}
              label="більше 15 тижнів"
            />
          </RadioGroup>
          {/* {!!errors.duration && <ErrorMessage message={errors.duration} />} */}
        </FormControl>
        {/* <AddFormLabelWrapper>
        <AddFormLabel htmlFor="duration">
          Тривалість
          <AddFormInput
            type="text"
            name="duration"
            onChange={handleInputChange}
            value={formData.duration}
            onBlur={() => validateField('duration', formData, setErrors)}
            className={errors.duration ? 'invalid' : ''}
          />
        </AddFormLabel>
        {!!errors.duration && <ErrorMessage message={errors.duration} />}
      </AddFormLabelWrapper> */}
        <FormControl
          sx={{
            marginTop: 4,
            minWidth: 494,
          }}
        >
          <InputLabel id="training-label">Тренування</InputLabel>
          <Select
            labelId="training-label"
            id="training-select"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Тренування" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          {!!errors.training && <ErrorMessage message={errors.training} />}
        </FormControl>
      </Box>
      {/* <AddFormLabelWrapper>
        <AddFormLabel htmlFor="training">
          Тренування
          <AddFormInput
            type="text"
            name="training"
            onChange={handleInputChange}
            value={formData.training}
            onBlur={() => validateField('training', formData, setErrors)}
            className={errors.training ? 'invalid' : ''}
          />
        </AddFormLabel>
        {!!errors.training && <ErrorMessage message={errors.training} />}
      </AddFormLabelWrapper> */}
      <AddFormButtonWrapper>
        <AddFormButtonNext
          type="button"
          text="Next"
          icon={
            <MdOutlineFitnessCenter
              style={{ stroke: '#FEF9F9', width: '24px', height: '24px' }}
            />
          }
          clickHandler={nextStep}
          filled={false}
          isDisabled={isDisabled}
        />
        <AddFormButtonBack
          type="button"
          clickHandler={backStep}
          text="Back"
          isLink={false}
        />
      </AddFormButtonWrapper>
    </ProgramFormWrapper>
  );
};

export default ProgramDetailsForWeigth;
