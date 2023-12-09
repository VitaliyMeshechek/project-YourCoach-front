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
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Formik, Field, Form } from 'formik';

import { AddFormButtonWrapper } from '../ProgramForm/ProgramForm.styled';
import AddFormButtonBack from '../AddFormButton/AddFormButtonBack';
import AddFormButtonNext from '../AddFormButton/AddFormButtonNext';
import { MdOutlineFitnessCenter } from 'react-icons/md';

import {
  ProgramFormWrapper,
  AddFormLabel,
  AddFormInput,
  AddFormLabelWrapper,
} from './ProgramDetails.styled';

import { validateField } from '../ValidateProgramSchema';

const ProgramDetails = ({ formData, setFormData, nextStep, backStep }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [personName, setPersonName] = useState([]);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const isNameFieldValid = Boolean(!errors.name && !!formData.name);
  const isFitnessWeigthFieldValid = Boolean(
    !errors.fitnessWeigth && !!formData.fitnessWeigth
  );
  const isFitnessStrengthFieldValid = Boolean(
    !errors.fitnessStrength && !!formData.fitnessStrength
  );
  const isFitnessWellnessFieldValid = Boolean(
    !errors.fitnessWellness && !!formData.fitnessWellness
  );
  const isDescriptionFieldValid = Boolean(
    !errors.description && !!formData.description
  );
  const isDurationFieldValid = Boolean(!errors.duration && !!formData.duration);
  const isTrainingFieldValid = Boolean(!errors.training && !!formData.training);

  // const initialValues = {
  //   name: '',
  //   description: '',
  //   training: '',
  //   location: '',
  //   comments: '',
  //   sell: '',
  //   food: '',
  //   special: '',
  //   avatar: null,
  //   duration: 0,
  // };

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
    if (formData.category === 'weigth') {
      setIsDisabled(
        !(
          isFitnessWeigthFieldValid &&
          isDescriptionFieldValid &&
          isDurationFieldValid &&
          isTrainingFieldValid
        )
      );
    }
    if (formData.category === 'strength fitness') {
      setIsDisabled(
        !(
          isFitnessStrengthFieldValid &&
          isDescriptionFieldValid &&
          isDurationFieldValid &&
          isTrainingFieldValid
        )
      );
    }
    if (formData.category === 'flexibility and wellness') {
      setIsDisabled(
        !(
          isFitnessWellnessFieldValid &&
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
    isFitnessWeigthFieldValid,
    isFitnessStrengthFieldValid,
    isFitnessWellnessFieldValid,
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
    console.log(value);
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
    console.log(value);
  };

  return (
    <ProgramFormWrapper>
      {/* <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: 494,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="name-label">Назва програми</InputLabel>
          <Select
            labelId="name-label"
            id="name-select"
            placeholder="Фітнес для жінок"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            category={formData.category}
            // onBlur={() => validateField('name', formData, setErrors)}
            // className={errors.name ? 'invalid' : ''}
          >
            <MenuItem value={1}>Аеробні програми</MenuItem>
            <MenuItem value={2}>Силові програми</MenuItem>
            <MenuItem value={3}>Оздоровчі програми</MenuItem>
            <MenuItem value={4}>Функціональний фітнес</MenuItem>
          </Select>
          {!!errors.name && <ErrorMessage message={errors.name} />}
        </FormControl>
              </Box> */}
      {/* <FormControl fullWidth>
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
          </FormControl> */}

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
      <Formik
      // initialValues={initialValues}
      // validationSchema={validateField}
      // onSubmit={handleSubmit}
      >
        {props => (
          <Form>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                minWidth: 594,
              }}
            >
              {formData.category === 'fitnes for women' && (
                <FormControl fullWidth htmlFor="name">
                  <InputLabel id="name-label">Назва програми</InputLabel>
                  <Field
                    as={Select}
                    labelId="name-label"
                    id="name-select"
                    placeholder="Фітнес для жінок"
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={formData.name}
                    category={formData.category}
                    onBlur={() =>
                      validateField('name', formData.name, setErrors)
                    }
                    // helperText={<ErrorMessage message={errors.name} />}
                  >
                    <MenuItem value={1}>Аеробні програми</MenuItem>
                    <MenuItem value={2}>Силові програми</MenuItem>
                    <MenuItem value={3}>Оздоровчі програми</MenuItem>
                    <MenuItem value={4}>Функціональний фітнес</MenuItem>
                  </Field>
                  {!formData.name ? <ErrorMessage message={errors.name} /> : ''}
                </FormControl>
              )}
              {formData.category === 'weigth' && (
                <FormControl fullWidth htmlFor="fitnessWeigth">
                  <InputLabel id="fitnessWeigth-label">
                    Назва програми
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="fitnessWeigth-label"
                    id="fitnessWeigth-select"
                    placeholder="Програма схуднення"
                    type="text"
                    name="fitnessWeigth"
                    onChange={handleInputChange}
                    value={formData.fitnessWeigth}
                    onBlur={() =>
                      validateField(
                        'fitnessWeigth',
                        formData.fitnessWeigth,
                        setErrors
                      )
                    }
                  >
                    <MenuItem value={1}>Аеробіка</MenuItem>
                    <MenuItem value={2}>Аеробний фітнес</MenuItem>
                  </Field>
                  {!formData.fitnessWeigth ? (
                    <ErrorMessage message={errors.fitnessWeigth} />
                  ) : (
                    ''
                  )}
                </FormControl>
              )}
              {formData.category === 'strength fitness' && (
                <FormControl fullWidth htmlFor="fitnessStrength">
                  <InputLabel id="fitnessStrength-label">
                    Назва програми
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="fitnessStrength-label"
                    id="fitnessStrength-select"
                    placeholder="Силовий фітнес"
                    type="text"
                    name="fitnessStrength"
                    onChange={handleInputChange}
                    value={formData.fitnessStrength}
                    onBlur={() =>
                      validateField(
                        'fitnessStrength',
                        formData.fitnessStrength,
                        setErrors
                      )
                    }
                  >
                    <MenuItem value={1}>Body Up</MenuItem>
                    <MenuItem value={2}>Body Low</MenuItem>
                    <MenuItem value={3}>Body Pump</MenuItem>
                    <MenuItem value={4}>Body Sculpt</MenuItem>
                    <MenuItem value={5}>ABS</MenuItem>
                  </Field>
                  {!formData.fitnessStrength ? (
                    <ErrorMessage message={errors.fitnessStrength} />
                  ) : (
                    ''
                  )}
                </FormControl>
              )}
              {formData.category === 'flexibility and wellness' && (
                <FormControl fullWidth htmlFor="fitnessWellness">
                  <InputLabel id="fitnessWellness-label">
                    Назва програми
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="fitnessWellness-label"
                    id="fitnessWellness-select"
                    placeholder="Силовий фітнес"
                    type="text"
                    name="fitnessWellness"
                    onChange={handleInputChange}
                    value={formData.fitnessWellness}
                    onBlur={() =>
                      validateField(
                        'fitnessWellness',
                        formData.fitnessWellness,
                        setErrors
                      )
                    }
                  >
                    <MenuItem value={1}>Yoga</MenuItem>
                    <MenuItem value={2}>Pilates</MenuItem>
                    <MenuItem value={3}>Stretching</MenuItem>
                  </Field>
                  {!formData.fitnessWellness ? (
                    <ErrorMessage message={errors.fitnessWellness} />
                  ) : (
                    ''
                  )}
                </FormControl>
              )}
              {/* <AddFormLabelWrapper>
              <AddFormLabel htmlFor="title">
                Назва програми
                <AddFormInput
                  placeholder="Fitness for women"
                  type="text"
                  name="title"
                  onChange={handleInputChange}
                  value={formData.title}
                  onBlur={() => validateField('title', formData, setErrors)}
                  className={errors.title ? 'invalid' : ''}
                />
              </AddFormLabel>
              {!!errors.title && <ErrorMessage message={errors.title} />}
            </AddFormLabelWrapper> */}
              <Field
                as={TextField}
                htmlFor="description"
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
                onBlur={() => validateField('description', formData, setErrors)}
                helperText={<ErrorMessage message={errors.description} />}
              />

              {/* <AddFormLabelWrapper>
              <AddFormLabel htmlFor="description">
                Опис
                <AddFormInput
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  value={formData.description}
                  onBlur={() =>
                    validateField('description', formData, setErrors)
                  }
                  className={errors.description ? 'invalid' : ''}
                />
              </AddFormLabel>
              {!!errors.description && (
                <ErrorMessage message={errors.description} />
              )}
            </AddFormLabelWrapper> */}
              <FormControl>
                <FormLabel
                  id="duration-label"
                  sx={{
                    marginTop: 4,
                    minWidth: 494,
                  }}
                >
                  Тривалість
                </FormLabel>
                <Field
                  as={RadioGroup}
                  htmlFor="duration"
                  aria-labelledby="duration-label"
                  type="text"
                  name="duration"
                  onChange={handleInputChange}
                  value={formData.duration}
                  helperText={
                    !!errors.duration && (
                      <ErrorMessage message={errors.duration} />
                    )
                  }
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
                </Field>
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
                <Field
                  as={Select}
                  htmlFor="training"
                  labelId="training-label"
                  id="training-select"
                  multiple
                  name="training"
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Тренування" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                  helperText={
                    !!errors.training && (
                      <ErrorMessage message={errors.training} />
                    )
                  }
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Field>
                {/* {!!errors.training && <ErrorMessage message={errors.training} />} */}
              </FormControl>

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
                  text="Далі"
                  icon={
                    <MdOutlineFitnessCenter
                      style={{ fill: '#ffff00', width: '20px', height: '20px' }}
                    />
                  }
                  clickHandler={nextStep}
                  filled={false}
                  isDisabled={isDisabled}
                />
                <AddFormButtonBack
                  type="button"
                  clickHandler={backStep}
                  text="Назад"
                  isLink={false}
                />
              </AddFormButtonWrapper>
            </Box>
          </Form>
        )}
      </Formik>
    </ProgramFormWrapper>
  );
};

export default ProgramDetails;
