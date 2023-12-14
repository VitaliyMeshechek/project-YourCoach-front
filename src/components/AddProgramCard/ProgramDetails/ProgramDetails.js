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
  const [errors, setErrors] = useState({});

  const isNameFieldValid = Boolean(!!formData.name && !errors.name);
  const isFitnessWeigthFieldValid = Boolean(
    !!formData.fitnessWeigth && !errors.fitnessWeigth
  );
  const isFitnessStrengthFieldValid = Boolean(
    !!formData.fitnessStrength && !errors.fitnessStrength
  );
  const isFitnessWellnessFieldValid = Boolean(
    !!formData.fitnessWellness && !errors.fitnessWellness
  );
  const isDescriptionFieldValid = Boolean(
    !!formData.description && !errors.description
  );
  const isDurationFieldValid = Boolean(!!formData.duration && !errors.duration);
  const isTrainingFieldValid = Boolean(!!personName && !errors.personName);

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

  const onInputChange = event => {
    const { value } = event.target;

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    // console.log('handleChange', value);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;

    setErrors(prevState => ({ ...prevState, [name]: '' }));

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    console.log(value);
  };

  return (
    <ProgramFormWrapper>
      <Formik initialValues={[personName]}>
        {({ touched }) => (
          <Form sx={{ minWidth: 594 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              {formData.category === 'fitnes for women' && (
                <FormControl
                  fullWidth
                  htmlFor="name"
                  sx={{ minWidth: 594, display: 'flex' }}
                  variant="outlined"
                >
                  <InputLabel
                    id="name-label"
                    sx={{
                      fontSize: 16,
                      textAline: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Назва програми
                  </InputLabel>
                  <Field
                    as={Select}
                    labelId="name-label"
                    id="name-select"
                    name="name"
                    type="text"
                    onChange={handleInputChange}
                    sx={{ borderRadius: 40 }}
                    value={formData.name}
                    // onBlur={() => validateField('name', formData, setErrors)}
                  >
                    {!!formData.name && !errors.name && !touched.name ? (
                      <ErrorMessage message={errors.name} />
                    ) : null}
                    <MenuItem value={1}>Аеробні програми</MenuItem>
                    <MenuItem value={2}>Силові програми</MenuItem>
                    <MenuItem value={3}>Оздоровчі програми</MenuItem>
                    <MenuItem value={4}>Функціональний фітнес</MenuItem>
                  </Field>
                </FormControl>
              )}

              {formData.category === 'weigth' && (
                <Box sx={{ minWidth: 594 }}>
                  <FormControl fullWidth htmlFor="fitnessWeigth">
                    <InputLabel id="fitnessWeigth-label" sx={{ fontSize: 16 }}>
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
                      sx={{ borderRadius: 40 }}
                      // onBlur={() =>
                      //   validateField(
                      //     'fitnessWeigth',
                      //     formData.fitnessWeigth,
                      //     setErrors
                      //   )
                      // }
                    >
                      {!!formData.fitnessWeigth &&
                      !errors.fitnessWeigth &&
                      !touched.fitnessWeigth ? (
                        <ErrorMessage message={errors.fitnessWeigth} />
                      ) : null}
                      <MenuItem value={1}>Аеробіка</MenuItem>
                      <MenuItem value={2}>Аеробний фітнес</MenuItem>
                    </Field>
                  </FormControl>
                </Box>
              )}
              {formData.category === 'strength fitness' && (
                <Box sx={{ minWidth: 594 }}>
                  <FormControl fullWidth htmlFor="fitnessStrength">
                    <InputLabel
                      id="fitnessStrength-label"
                      sx={{ fontSize: 16 }}
                    >
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
                      sx={{ borderRadius: 40 }}
                      // onBlur={() =>
                      //   validateField(
                      //     'fitnessStrength',
                      //     formData.fitnessStrength,
                      //     setErrors
                      //   )
                      // }
                    >
                      {!!formData.fitnessStrength &&
                      !errors.fitnessStrength &&
                      !touched.fitnessStrength ? (
                        <ErrorMessage message={errors.fitnessStrength} />
                      ) : null}
                      <MenuItem value={1}>Body Up</MenuItem>
                      <MenuItem value={2}>Body Low</MenuItem>
                      <MenuItem value={3}>Body Pump</MenuItem>
                      <MenuItem value={4}>Body Sculpt</MenuItem>
                      <MenuItem value={5}>ABS</MenuItem>
                    </Field>
                  </FormControl>
                </Box>
              )}
              {formData.category === 'flexibility and wellness' && (
                <Box sx={{ minWidth: 594 }}>
                  <FormControl fullWidth htmlFor="fitnessWellness">
                    <InputLabel
                      id="fitnessWellness-label"
                      sx={{ fontSize: 16 }}
                    >
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
                      sx={{ borderRadius: 40 }}
                      // onBlur={() =>
                      //   validateField(
                      //     'fitnessWellness',
                      //     formData.fitnessWellness,
                      //     setErrors
                      //   )
                      // }
                    >
                      {!!formData.fitnessWellness &&
                      !errors.fitnessWellness &&
                      !touched.fitnessWellness ? (
                        <ErrorMessage message={errors.fitnessWellness} />
                      ) : null}
                      <MenuItem value={1}>Yoga</MenuItem>
                      <MenuItem value={2}>Pilates</MenuItem>
                      <MenuItem value={3}>Stretching</MenuItem>
                    </Field>
                  </FormControl>
                </Box>
              )}
              <Box
                component="form"
                sx={{ '& > :not(style)': { marginTop: 4, width: 594 } }}
              >
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
                  InputProps={{ sx: { borderRadius: 40, minWidth: 594 } }}
                  onBlur={() =>
                    validateField('description', formData, setErrors)
                  }
                />
                {!!formData.description &&
                !errors.description &&
                !touched.description ? (
                  <ErrorMessage message={errors.description} />
                ) : null}
              </Box>
              <FormControl>
                <FormLabel
                  id="duration-label"
                  sx={{
                    marginTop: 4,
                    minWidth: 594,
                  }}
                >
                  Тривалість
                </FormLabel>
                <Field
                  as={RadioGroup}
                  htmlFor="duration"
                  aria-label="duration-label"
                  type="text"
                  name="duration"
                  onChange={handleInputChange}
                  value={formData.duration}
                  // onBlur={() => validateField('duration', formData, setErrors)}
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
                  {!!formData.duration &&
                  !errors.duration &&
                  !touched.duration ? (
                    <ErrorMessage message={errors.duration} />
                  ) : null}
                </Field>
              </FormControl>
              <FormControl
                sx={{
                  marginTop: 4,
                  minWidth: 594,
                }}
              >
                <InputLabel
                  id="training-label"
                  sx={{
                    fontSize: 16,
                    textAline: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Тренування
                </InputLabel>
                <Field
                  as={Select}
                  htmlFor="training"
                  labelId="training-label"
                  id="training-select"
                  multiple
                  name="training"
                  value={personName}
                  onChange={onInputChange}
                  input={<OutlinedInput label="Тренування" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                  sx={{ borderRadius: 40 }}
                  onBlur={() => validateField('training', formData, setErrors)}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                  {!!personName && !errors.personName && !touched.personName ? (
                    <ErrorMessage message={errors.personName} />
                  ) : null}
                </Field>
              </FormControl>
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
