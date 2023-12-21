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
  const [dietName, setDietName] = useState([]);
  const [errors, setErrors] = useState({});
  const [isActiveAerobic, setIsActiveAerobic] = useState(false);
  const [isActiveStrong, setIsActiveStrong] = useState(false);
  const [isActiveHealth, setIsActiveHealth] = useState(false);
  const [isActiveFunction, setIsActiveFunction] = useState(false);
  const [isActiveStep, setIsActiveStep] = useState(false);
  const [isActiveImpact, setIsActiveImpact] = useState(false);

  const isNameFieldValid = Boolean(!!formData.name && !errors.name);
  const isAerobicFieldValid = Boolean(!!formData.aerobic && !errors.aerobic);
  const isStrongFieldValid = Boolean(!!formData.strong && !errors.strong);
  const isHealthFieldValid = Boolean(!!formData.health && !errors.health);
  const isFunctionFieldValid = Boolean(!!formData.function && !errors.function);
  const isStepFieldValid = Boolean(!!formData.step && !errors.step);
  const isImpactFieldValid = Boolean(!!formData.impact && !errors.impact);
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
  const isDietFieldValid = Boolean(!!dietName && !errors.dietName);
  const isFoodFieldValid = Boolean(!!formData.food && !errors.food);

  useEffect(() => {
    if (formData.category === 'fitnes for women') {
      setIsDisabled(
        !(
          isNameFieldValid &&
          isAerobicFieldValid &&
          isStrongFieldValid &&
          isHealthFieldValid &&
          isFunctionFieldValid &&
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
          isStepFieldValid &&
          isImpactFieldValid &&
          isDescriptionFieldValid &&
          isDurationFieldValid &&
          isTrainingFieldValid &&
          isDietFieldValid
        )
      );
    }
    if (formData.category === 'strength fitness') {
      setIsDisabled(
        !(
          isFitnessStrengthFieldValid &&
          isDescriptionFieldValid &&
          isDurationFieldValid &&
          isTrainingFieldValid &&
          isFoodFieldValid
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
    formData.aerobic,
    isDescriptionFieldValid,
    isDurationFieldValid,
    isNameFieldValid,
    isAerobicFieldValid,
    isStrongFieldValid,
    isHealthFieldValid,
    isFunctionFieldValid,
    isStepFieldValid,
    isImpactFieldValid,
    isTrainingFieldValid,
    isDietFieldValid,
    isFitnessWeigthFieldValid,
    isFitnessStrengthFieldValid,
    isFitnessWellnessFieldValid,
    isFoodFieldValid,
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
  const specialDiet = [
    'Підбір раціонального харчування',
    'Консультація або порада дієтолога',
    'Можливість тренування старших груп',
  ];

  const onInputChangeTraining = event => {
    const { value } = event.target;

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const onInputChangeDiet = event => {
    const { value } = event.target;

    // console.log('handleChange', value);
    setDietName(typeof value === 'string' ? value.split(',') : value);
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
      <Formik>
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
                    <MenuItem
                      value={'аеробні програми'}
                      onClick={() => setIsActiveAerobic(true)}
                    >
                      Аеробні програми
                    </MenuItem>
                    <MenuItem
                      value={'силові програми'}
                      onClick={() => setIsActiveStrong(true)}
                      // onClick={() => setIsActiveAerobic(false)}
                    >
                      Силові програми
                    </MenuItem>
                    <MenuItem
                      value={'оздоровчі програми'}
                      onClick={() => setIsActiveHealth(true)}
                    >
                      Оздоровчі програми
                    </MenuItem>
                    <MenuItem
                      value={'функціональний фітнес'}
                      onClick={() => setIsActiveFunction(true)}
                    >
                      Функціональний фітнес
                    </MenuItem>
                  </Field>
                  {isActiveAerobic && !isActiveStrong ? (
                    <FormControl>
                      <FormLabel
                        id="aerobic-label"
                        sx={{
                          marginTop: 4,
                          minWidth: 594,
                        }}
                      >
                        Тип програми
                      </FormLabel>
                      <Field
                        as={RadioGroup}
                        htmlFor="aerobic"
                        aria-label="aerobic-label"
                        type="text"
                        name="aerobic"
                        onChange={handleInputChange}
                        value={formData.aerobic}
                      >
                        <FormControlLabel
                          value="step aerobics"
                          control={<Radio />}
                          label="Step Aerobics"
                        />
                        <FormControlLabel
                          value="fitball aerobics"
                          control={<Radio />}
                          label="Fitball Aerobics"
                        />
                        <FormControlLabel
                          value="another"
                          control={<Radio />}
                          label="Інше"
                        />
                        {!!formData.aerobic && !errors.aerobic ? (
                          <ErrorMessage message={errors.aerobic} />
                        ) : null}
                      </Field>
                    </FormControl>
                  ) : null}
                  {isActiveStrong && !isActiveHealth ? (
                    <FormControl>
                      <FormLabel
                        id="strong-label"
                        sx={{
                          marginTop: 4,
                          minWidth: 594,
                        }}
                      >
                        Тип програми
                      </FormLabel>
                      <Field
                        as={RadioGroup}
                        htmlFor="strong"
                        aria-label="strong-label"
                        type="text"
                        name="strong"
                        onChange={handleInputChange}
                        value={formData.strong}
                      >
                        <FormControlLabel
                          value="body up"
                          control={<Radio />}
                          label="Body Up"
                        />
                        <FormControlLabel
                          value="body pump"
                          control={<Radio />}
                          label="Body Pump"
                        />
                        <FormControlLabel
                          value="abs"
                          control={<Radio />}
                          label="Тренування ABS"
                        />
                        {!!formData.strong && !errors.strong ? (
                          <ErrorMessage message={errors.strong} />
                        ) : null}
                      </Field>
                    </FormControl>
                  ) : null}
                  {isActiveHealth && !isActiveFunction ? (
                    <FormControl>
                      <FormLabel
                        id="health-label"
                        sx={{
                          marginTop: 4,
                          minWidth: 594,
                        }}
                      >
                        Тип програми
                      </FormLabel>
                      <Field
                        as={RadioGroup}
                        htmlFor="health"
                        aria-label="health-label"
                        type="text"
                        name="health"
                        onChange={handleInputChange}
                        value={formData.health}
                      >
                        <FormControlLabel
                          value="йога"
                          control={<Radio />}
                          label="Йога"
                        />
                        <FormControlLabel
                          value="пілатес"
                          control={<Radio />}
                          label="Пілатес"
                        />
                        <FormControlLabel
                          value="ци-гун"
                          control={<Radio />}
                          label="Ци-гун"
                        />
                        <FormControlLabel
                          value="стретчінг"
                          control={<Radio />}
                          label="Стретчінг"
                        />
                        <FormControlLabel
                          value="калланетіка"
                          control={<Radio />}
                          label="Калланетіка"
                        />
                        {!!formData.health && !errors.health ? (
                          <ErrorMessage message={errors.health} />
                        ) : null}
                      </Field>
                    </FormControl>
                  ) : null}
                  {isActiveFunction && (
                    <FormControl>
                      <FormLabel
                        id="function-label"
                        sx={{
                          marginTop: 4,
                          minWidth: 594,
                        }}
                      >
                        Тип програми
                      </FormLabel>
                      <Field
                        as={RadioGroup}
                        htmlFor="function"
                        aria-label="function-label"
                        type="text"
                        name="function"
                        onChange={handleInputChange}
                        value={formData.function}
                      >
                        <FormControlLabel
                          value="zumba"
                          control={<Radio />}
                          label="Zumba"
                        />
                        <FormControlLabel
                          value="dance fitness"
                          control={<Radio />}
                          label="Dance Fitness"
                        />
                        <FormControlLabel
                          value="belly dance"
                          control={<Radio />}
                          label="Belly Dance"
                        />
                        <FormControlLabel
                          value="strip dance"
                          control={<Radio />}
                          label="Strip Dance"
                        />
                        <FormControlLabel
                          value="another"
                          control={<Radio />}
                          label="Інше"
                        />
                        {!!formData.function && !errors.function ? (
                          <ErrorMessage message={errors.function} />
                        ) : null}
                      </Field>
                    </FormControl>
                  )}
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
                      <MenuItem
                        value={'аеробіка'}
                        onClick={() => setIsActiveStep(true)}
                      >
                        Аеробіка
                      </MenuItem>
                      <MenuItem
                        value={'аеробний фітнес'}
                        onClick={() => setIsActiveImpact(true)}
                      >
                        Аеробний фітнес
                      </MenuItem>
                    </Field>
                    {isActiveStep && !isActiveImpact ? (
                      <FormControl>
                        <FormLabel
                          id="step-label"
                          sx={{
                            marginTop: 4,
                            minWidth: 594,
                          }}
                        >
                          Тип програми
                        </FormLabel>
                        <Field
                          as={RadioGroup}
                          htmlFor="step"
                          aria-label="step-label"
                          type="text"
                          name="step"
                          onChange={handleInputChange}
                          value={formData.step}
                        >
                          <FormControlLabel
                            value="step-intro"
                            control={<Radio />}
                            label="Step-Intro"
                          />
                          <FormControlLabel
                            value="step-b"
                            control={<Radio />}
                            label="Step-B"
                          />
                          <FormControlLabel
                            value="power-step"
                            control={<Radio />}
                            label="Power-Step"
                          />
                          {!!formData.step && !errors.step ? (
                            <ErrorMessage message={errors.step} />
                          ) : null}
                        </Field>
                      </FormControl>
                    ) : null}
                    {isActiveImpact && (
                      <FormControl>
                        <FormLabel
                          id="impact-label"
                          sx={{
                            marginTop: 4,
                            minWidth: 594,
                          }}
                        >
                          Тип програми
                        </FormLabel>
                        <Field
                          as={RadioGroup}
                          htmlFor="impact"
                          aria-label="impact-label"
                          type="text"
                          name="impact"
                          onChange={handleInputChange}
                          value={formData.impact}
                        >
                          <FormControlLabel
                            value="low-impact aerobics"
                            control={<Radio />}
                            label="Low-Impact Aerobics"
                          />
                          <FormControlLabel
                            value="low-a"
                            control={<Radio />}
                            label="Low-A"
                          />
                          <FormControlLabel
                            value="middle-impact"
                            control={<Radio />}
                            label="Middle-Impact"
                          />
                          <FormControlLabel
                            value="high-impact"
                            control={<Radio />}
                            label="High-Impact"
                          />
                          {!!formData.impact && !errors.impact ? (
                            <ErrorMessage message={errors.impact} />
                          ) : null}
                        </Field>
                      </FormControl>
                    )}
                    <FormControl
                      sx={{
                        marginTop: 4,
                        minWidth: 594,
                      }}
                    >
                      <InputLabel
                        id="special-label"
                        sx={{
                          fontSize: 16,
                          textAline: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        Особливості програми
                      </InputLabel>
                      <Field
                        as={Select}
                        htmlFor="special"
                        labelId="special-label"
                        id="special-select"
                        multiple
                        name="special"
                        value={dietName}
                        onChange={onInputChangeDiet}
                        input={<OutlinedInput label="Особливості програми" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                        sx={{ borderRadius: 40 }}
                        onBlur={() =>
                          validateField('special', formData, setErrors)
                        }
                      >
                        {specialDiet.map(diet => (
                          <MenuItem key={diet} value={diet}>
                            <Checkbox checked={dietName.indexOf(diet) > -1} />
                            <ListItemText primary={diet} />
                          </MenuItem>
                        ))}
                        {!!dietName && !errors.dietName && !touched.dietName ? (
                          <ErrorMessage message={errors.dietName} />
                        ) : null}
                      </Field>
                    </FormControl>
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
                    <FormControl>
                      <FormLabel
                        id="food-label"
                        sx={{
                          marginTop: 4,
                          minWidth: 594,
                        }}
                      >
                        Підбір харчування
                      </FormLabel>
                      <Field
                        as={RadioGroup}
                        htmlFor="food"
                        aria-label="food-label"
                        type="text"
                        name="food"
                        onChange={handleInputChange}
                        value={formData.food}
                      >
                        <FormControlLabel
                          value="продукти тваринного походження"
                          control={<Radio />}
                          label="Продукти тваринного походження"
                        />
                        <FormControlLabel
                          value="продукти рослинного походження"
                          control={<Radio />}
                          label="Продукти рослинного походження"
                        />
                        {!!formData.food && !errors.food ? (
                          <ErrorMessage message={errors.food} />
                        ) : null}
                      </Field>
                    </FormControl>
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
                  onChange={onInputChangeTraining}
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
