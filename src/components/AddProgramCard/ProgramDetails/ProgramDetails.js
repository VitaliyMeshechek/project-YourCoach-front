import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
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
  const isFunctionFieldValid = Boolean(
    !!formData.functions && !errors.functions
  );
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
  const isNameYourProgramFieldValid = Boolean(
    !!formData.nameYourProgram && !errors.nameYourProgram
  );
  const isTypeYourProgramFieldValid = Boolean(
    !!formData.typeYourProgram && !errors.typeYourProgram
  );
  const isDescriptionYourProgramFieldValid = Boolean(
    !!formData.descriptionYourProgram && !errors.descriptionYourProgram
  );
  const isDurationYourProgram = Boolean(
    !!formData.durationYourProgram && !errors.durationYourProgram
  );
  const isTrainingYourProgram = Boolean(
    !!formData.trainingYourProgram && !errors.trainingYourProgram
  );

  useEffect(() => {
    if (formData.category === 'your program') {
      setIsDisabled(
        !(
          isNameYourProgramFieldValid &&
          isTypeYourProgramFieldValid &&
          // isDescriptionYourProgramFieldValid &&
          isDescriptionFieldValid &&
          // isDurationYourProgram &&
          // isTrainingYourProgram
          isDurationFieldValid &&
          isTrainingFieldValid
        )
      );
    }

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
    isNameYourProgramFieldValid,
    isTypeYourProgramFieldValid,
    isDescriptionYourProgramFieldValid,
    isDurationYourProgram,
    isTrainingYourProgram,
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {formData.category === 'fitnes for women' && (
          <div>
            <FormControl
              fullWidth
              htmlFor="name"
              sx={{ minWidth: 594, display: 'flex' }}
            >
              <InputLabel id="name-label" sx={{ fontSize: 16 }}>
                Назва програми
              </InputLabel>
              <Select
                native
                // defaultValue=""
                id="name-select"
                name="name"
                type="text"
                label="Назва програми"
                onChange={handleInputChange}
                value={formData.name}
                sx={{ borderRadius: 40, marginBottom: 4 }}
              >
                {!!formData.name && !errors.name ? (
                  <ErrorMessage message={errors.name} />
                ) : null}
                <option aria-label="None" value="" />
                <optgroup label="Аеробні програми">
                  <option value={'Аеробні програми'}>Аеробні програми</option>
                </optgroup>
                <optgroup label="Силові програми">
                  <option value={'Силові програми'}>Силові програми</option>
                </optgroup>
                <optgroup label="Оздоровчі програми">
                  <option value={'Оздоровчі програми'}>
                    Оздоровчі програми
                  </option>
                </optgroup>
                <optgroup label="Функціональний фітнес">
                  <option value={'Функціональний фітнес'}>
                    Функціональний фітнес
                  </option>
                </optgroup>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              htmlFor="kind"
              sx={{ minWidth: 594, display: 'flex' }}
            >
              <InputLabel id="kind-label" sx={{ fontSize: 16 }}>
                Тип програми
              </InputLabel>
              <Select
                // defaultValue=""
                id="kind-select"
                name="kind"
                type="text"
                label="Тип програми"
                onChange={handleInputChange}
                value={formData.kind}
                sx={{ borderRadius: 40 }}
              >
                {!!formData.kind && !errors.kind ? (
                  <ErrorMessage message={errors.kind} />
                ) : null}
                <ListSubheader>Аеробні програми</ListSubheader>
                <MenuItem value={'Step Aerobics'}>Step Aerobics</MenuItem>
                <MenuItem value={'Fitball Aerobics'}>Fitball Aerobics</MenuItem>
                <ListSubheader>Силові програми</ListSubheader>
                <MenuItem value={'Body Up'}>Body Up</MenuItem>
                <MenuItem value={'Body Pump'}>Body Pump</MenuItem>
                <MenuItem value={'Тренування ABS'}>Тренування ABS</MenuItem>
                <ListSubheader>Оздоровчі програми</ListSubheader>
                <MenuItem value={'Йога'}>Йога</MenuItem>
                <MenuItem value={'Пілатес'}>Пілатес</MenuItem>
                <MenuItem value={'Ци-гун'}>Ци-гун</MenuItem>
                <MenuItem value={'Стретчінг'}>Стретчінг</MenuItem>
                <MenuItem value={'Калланетіка'}>Калланетіка</MenuItem>
                <ListSubheader>Функціональний фітнес</ListSubheader>
                <MenuItem value={'Zumba'}>Zumba</MenuItem>
                <MenuItem value={'Dance Fitness'}>Dance Fitness</MenuItem>
                <MenuItem value={'Belly Dance'}>Belly Dance</MenuItem>
                <MenuItem value={'Strip Dance'}>Strip Dance</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        {formData.category === 'weigth' && (
          <div>
            <FormControl
              fullWidth
              htmlFor="fitnessWeigth"
              sx={{ minWidth: 594, display: 'flex' }}
            >
              <InputLabel id="fitnessWeigth-label" sx={{ fontSize: 16 }}>
                Назва програми
              </InputLabel>
              <Select
                native
                // defaultValue=""
                id="fitnessWeigth-select"
                name="fitnessWeigth"
                type="text"
                label="Назва програми"
                onChange={handleInputChange}
                value={formData.fitnessWeigth}
                sx={{ borderRadius: 40, marginBottom: 4 }}
              >
                {!!formData.fitnessWeigth && !errors.fitnessWeigth ? (
                  <ErrorMessage message={errors.fitnessWeigth} />
                ) : null}
                <option aria-label="None" value="" />
                <optgroup label="Аеробіка">
                  <option value={'Аеробіка'}>Аеробіка</option>
                </optgroup>
                <optgroup label="Аеробний фітнес">
                  <option value={'Аеробний фітнес'}>Аеробний фітнес</option>
                </optgroup>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              htmlFor="kindProgramWeigth"
              sx={{ minWidth: 594, display: 'flex' }}
            >
              <InputLabel id="kindProgramWeigth-label" sx={{ fontSize: 16 }}>
                Тип програми
              </InputLabel>
              <Select
                // defaultValue=""
                id="kindProgramWeigth-select"
                name="kindProgramWeigth"
                type="text"
                label="Тип програми"
                onChange={handleInputChange}
                value={formData.kindProgramWeigth}
                sx={{ borderRadius: 40 }}
              >
                {!!formData.kindProgramWeigth && !errors.kindProgramWeigth ? (
                  <ErrorMessage message={errors.kindProgramWeigth} />
                ) : null}
                <ListSubheader>Аеробіка</ListSubheader>
                <MenuItem value={'Step-Intro'}>Step-Intro</MenuItem>
                <MenuItem value={'Step-B'}>Step-B</MenuItem>
                <MenuItem value={'Power-Step'}>Power-Step</MenuItem>
                <ListSubheader>Аеробний фітнес</ListSubheader>
                <MenuItem value={'Low-Impact Aerobics'}>
                  Low-Impact Aerobics
                </MenuItem>
                <MenuItem value={'Low-A'}>Low-A</MenuItem>
                <MenuItem value={'Middle-Impact'}>Middle-Impact</MenuItem>
                <MenuItem value={'High-Impact'}>High-Impact</MenuItem>
              </Select>
            </FormControl>
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
              <Select
                // as={Select}
                htmlFor="special"
                // labelId="special-label"
                id="special-select"
                multiple
                name="special"
                value={dietName}
                onChange={onInputChangeDiet}
                input={<OutlinedInput label="Особливості програми" />}
                renderValue={selected => selected.join(', ')}
                MenuProps={MenuProps}
                sx={{ borderRadius: 40 }}
                onBlur={() => validateField('special', formData, setErrors)}
              >
                {specialDiet.map(diet => (
                  <MenuItem key={diet} value={diet}>
                    <Checkbox checked={dietName.indexOf(diet) > -1} />
                    <ListItemText primary={diet} />
                  </MenuItem>
                ))}
                {/* {!!dietName && !errors.dietName && !touched.dietName ? (
                              <ErrorMessage message={errors.dietName} />
                            ) : null} */}
              </Select>
            </FormControl>
          </div>
        )}
        {formData.category === 'strength fitness' && (
          <div>
            <FormControl
              fullWidth
              htmlFor="fitnessStrength"
              sx={{ minWidth: 594, display: 'flex' }}
            >
              <InputLabel id="fitnessStrength-label" sx={{ fontSize: 16 }}>
                Назва програми
              </InputLabel>
              <Select
                // defaultValue=""
                id="fitnessStrength-select"
                name="fitnessStrength"
                type="text"
                label="Назва програми"
                onChange={handleInputChange}
                value={formData.fitnessStrength}
                sx={{ borderRadius: 40 }}
              >
                {!!formData.fitnessStrength && !errors.fitnessStrength ? (
                  <ErrorMessage message={errors.fitnessStrength} />
                ) : null}
                <ListSubheader>Виберіть програму</ListSubheader>
                <MenuItem value={'Body Up'}>Body Up</MenuItem>
                <MenuItem value={'Body Low'}>Body Low</MenuItem>
                <MenuItem value={'Body Pump'}>Body Pump</MenuItem>
                <MenuItem value={'Body Sculpt'}>Body Sculpt</MenuItem>
                <MenuItem value={'ABS'}>ABS</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth htmlFor="food">
              <FormLabel
                id="food-label"
                sx={{
                  marginTop: 4,
                  minWidth: 594,
                }}
              >
                Підбір харчування
              </FormLabel>
              <RadioGroup
                // as={RadioGroup}
                htmlFor="food"
                // aria-label="food-label"
                type="text"
                name="food"
                onChange={handleInputChange}
                value={formData.food}
              >
                <FormControlLabel
                  value="Продукти тваринного походження"
                  control={<Radio />}
                  label="Продукти тваринного походження"
                />
                <FormControlLabel
                  value="Продукти рослинного походження"
                  control={<Radio />}
                  label="Продукти рослинного походження"
                />
                {!!formData.food && !errors.food ? (
                  <ErrorMessage message={errors.food} />
                ) : null}
              </RadioGroup>
            </FormControl>
          </div>
        )}
        {formData.category === 'flexibility and wellness' && (
          <div>
            <FormControl
              fullWidth
              htmlFor="fitnessWellness"
              sx={{ minWidth: 594, display: 'flex' }}
            >
              <InputLabel id="fitnessWellness-label" sx={{ fontSize: 16 }}>
                Назва програми
              </InputLabel>
              <Select
                // defaultValue=""
                id="fitnessWellness-select"
                name="fitnessWellness"
                type="text"
                label="Назва програми"
                onChange={handleInputChange}
                value={formData.fitnessWellness}
                sx={{ borderRadius: 40 }}
              >
                {!!formData.fitnessWellness && !errors.fitnessWellness ? (
                  <ErrorMessage message={errors.fitnessWellness} />
                ) : null}
                <ListSubheader>Виберіть програму</ListSubheader>
                <MenuItem value={'Yoga'}>Yoga</MenuItem>
                <MenuItem value={'Pilates'}>Pilates</MenuItem>
                <MenuItem value={'Stretching'}>Stretching</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        {formData.category === 'your program' && (
          <Box
            sx={{
              '& > :not(style)': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 4,
                width: 594,
              },
            }}
          >
            <FormControl fullWidth htmlFor="nameYourProgram">
              <TextField
                // as={TextField}
                htmlFor="nameYourProgram"
                id="nameYourProgram"
                variant="outlined"
                label="Назва програми"
                type="text"
                name="nameYourProgram"
                onChange={handleInputChange}
                value={formData.nameYourProgram}
                InputProps={{
                  sx: { borderRadius: 40, minWidth: 594 },
                }}
                onBlur={() =>
                  validateField('nameYourProgram', formData, setErrors)
                }
              />
            </FormControl>
            <FormControl fullWidth htmlFor="typeYourProgram">
              <TextField
                // as={TextField}
                htmlFor="typeYourProgram"
                id="typeYourProgram"
                variant="outlined"
                label="Тип програми"
                type="text"
                name="typeYourProgram"
                onChange={handleInputChange}
                value={formData.typeYourProgram}
                InputProps={{ sx: { borderRadius: 40, minWidth: 594 } }}
                onBlur={() =>
                  validateField('typeYourProgram', formData, setErrors)
                }
              />
            </FormControl>
          </Box>
        )}
        <div>
          <FormControl
            htmlFor="description"
            sx={{
              marginTop: 4,
              width: 594,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              id="description"
              label="Опис програми"
              variant="outlined"
              type="text"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
              InputProps={{ sx: { borderRadius: 40, minWidth: 594 } }}
              onBlur={() => validateField('description', formData, setErrors)}
            />
            {/* {!!formData.description &&
                   !errors.description ? (
                     <ErrorMessage message={errors.description} />
                   ) : null} */}
          </FormControl>
          <FormControl
            htmlFor="duration"
            sx={{
              marginTop: 4,
              width: 594,
              gap: 2,
              display: 'flex',
              justifyContent: 'start',
              // alignItems: 'center',
            }}
          >
            <FormLabel id="duration-label">Тривалість</FormLabel>
            <RadioGroup
              // as={RadioGroup}

              // aria-label="duration-label"
              type="text"
              name="duration"
              onChange={handleInputChange}
              value={formData.duration}
              // onBlur={() => validateField('duration', formData, setErrors)}
            >
              <FormControlLabel
                value="1-4 тижнів"
                control={<Radio />}
                label="1-4 тижнів"
              />
              <FormControlLabel
                value="5-8 тижнів"
                control={<Radio />}
                label="5-8 тижнів"
              />
              <FormControlLabel
                value="9-12 тижнів"
                control={<Radio />}
                label="9-12 тижнів"
              />
              <FormControlLabel
                value="12-15 тижнів"
                control={<Radio />}
                label="12-15 тижнів"
              />
              <FormControlLabel
                value="більше 15 тижнів"
                control={<Radio />}
                label="більше 15 тижнів"
              />
              {/* {!!formData.duration &&
                      !errors.duration &&
                      !touched.duration ? (
                        <ErrorMessage message={errors.duration} />
                      ) : null} */}
            </RadioGroup>
          </FormControl>
          <FormControl
            htmlFor="training"
            sx={{
              marginTop: 4,
              width: 594,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
            <Select
              htmlFor="training"
              id="training-select"
              multiple
              name="training"
              value={personName}
              onChange={onInputChangeTraining}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
              sx={{ borderRadius: 40, width: 594 }}
              onBlur={() => validateField('training', formData, setErrors)}
            >
              {names.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
              {/* {!!personName && !errors.personName ? (
              <ErrorMessage message={errors.personName} />
            ) : null} */}
            </Select>
          </FormControl>
        </div>
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
            // isDisabled={isDisabled}
          />
          <AddFormButtonBack
            type="button"
            clickHandler={backStep}
            text="Назад"
            isLink={false}
          />
        </AddFormButtonWrapper>
      </Box>
    </ProgramFormWrapper>
  );
};

//   return (
//     <ProgramFormWrapper>
//       {formData.category === 'fitnes for women' && (
//         <div>
//           <AddFormLabelWrapper>
//             <AddFormLabel htmlFor="name">
//               Назва програми:
//               <AddFormInput
//                 placeholder="Type name pet"
//                 type="text"
//                 name="name"
//                 onChange={handleInputChange}
//                 value={formData.name}
//                 onBlur={() => validateField('name', formData, setErrors)}
//                 className={errors.name ? 'invalid' : ''}
//               />
//             </AddFormLabel>
//             {!!errors.name && <ErrorMessage message={errors.name} />}
//           </AddFormLabelWrapper>
//           <AddFormLabelWrapper>
//             <AddFormLabel htmlFor="aerobic">
//               Тип програми:
//               <AddFormInput
//                 placeholder="Type aerobic pet"
//                 type="text"
//                 name="aerobic"
//                 onChange={handleInputChange}
//                 value={formData.aerobic}
//                 onBlur={() => validateField('aerobic', formData, setErrors)}
//                 className={errors.aerobic ? 'invalid' : ''}
//               />
//             </AddFormLabel>
//             {!!errors.aerobic && <ErrorMessage message={errors.aerobic} />}
//           </AddFormLabelWrapper>
//         </div>
//       )}
//       {formData.category === 'weigth' && (
//         <AddFormLabelWrapper>
//           <AddFormLabel htmlFor="special">
//             Особливості програми:
//             <AddFormInput
//               placeholder="Type special pet"
//               type="text"
//               name="special"
//               onChange={handleInputChange}
//               value={formData.special}
//               onBlur={() => validateField('special', formData, setErrors)}
//               className={errors.special ? 'invalid' : ''}
//             />
//           </AddFormLabel>
//           {!!errors.special && <ErrorMessage message={errors.special} />}

//           <FormControl fullWidth htmlFor="fitnessWeigth">
//             <InputLabel id="fitnessWeigth-label" sx={{ fontSize: 16 }}>
//               Назва програми
//             </InputLabel>
//             <Select
//               id="fitnessWeigth-select"
//               placeholder="Програма схуднення"
//               type="text"
//               name="fitnessWeigth"
//               onChange={handleInputChange}
//               value={formData.fitnessWeigth}
//               sx={{ borderRadius: 40 }}
//             >
//               {!!formData.fitnessWeigth && !errors.fitnessWeigth ? (
//                 <ErrorMessage message={errors.fitnessWeigth} />
//               ) : null}
//               <MenuItem
//                 value={'Аеробіка'}
//                 onClick={() => setIsActiveStep(true)}
//               >
//                 Аеробіка
//               </MenuItem>
//               <MenuItem
//                 value={'Аеробний фітнес'}
//                 onClick={() => setIsActiveImpact(true)}
//               >
//                 Аеробний фітнес
//               </MenuItem>
//             </Select>
//           </FormControl>
//         </AddFormLabelWrapper>
//       )}
//       {formData.category === 'strength fitness' && (
//         <AddFormLabelWrapper>
//           <AddFormLabel htmlFor="food">
//             Підбір харчування:
//             <AddFormInput
//               placeholder="Type food pet"
//               type="text"
//               name="food"
//               onChange={handleInputChange}
//               value={formData.food}
//               onBlur={() => validateField('food', formData, setErrors)}
//               className={errors.food ? 'invalid' : ''}
//             />
//           </AddFormLabel>
//           {!!errors.food && <ErrorMessage message={errors.food} />}
//         </AddFormLabelWrapper>
//       )}
//       {formData.category === 'flexibility and wellness' && (
//         <AddFormLabelWrapper>
//           <AddFormLabel htmlFor="fitnessWellness">
//             Назва програми:
//             <AddFormInput
//               placeholder="Type fitnessWellness pet"
//               type="text"
//               name="fitnessWellness"
//               onChange={handleInputChange}
//               value={formData.fitnessWellness}
//               onBlur={() =>
//                 validateField('fitnessWellness', formData, setErrors)
//               }
//               className={errors.fitnessWellness ? 'invalid' : ''}
//             />
//           </AddFormLabel>
//           {!!errors.fitnessWellness && (
//             <ErrorMessage message={errors.fitnessWellness} />
//           )}
//         </AddFormLabelWrapper>
//       )}
//       {formData.category === 'your program' && (
//         <div>
//           <AddFormLabelWrapper>
//             <AddFormLabel htmlFor="nameYourProgram">
//               Назва програми:
//               <AddFormInput
//                 placeholder="Type nameYourProgram pet"
//                 type="text"
//                 name="nameYourProgram"
//                 onChange={handleInputChange}
//                 value={formData.nameYourProgram}
//                 onBlur={() =>
//                   validateField('nameYourProgram', formData, setErrors)
//                 }
//                 className={errors.nameYourProgram ? 'invalid' : ''}
//               />
//             </AddFormLabel>
//             {!!errors.nameYourProgram && (
//               <ErrorMessage message={errors.nameYourProgram} />
//             )}
//           </AddFormLabelWrapper>
//           <AddFormLabelWrapper>
//             <AddFormLabel htmlFor="typeYourProgram">
//               Тип програми:
//               <AddFormInput
//                 placeholder="Type typeYourProgram pet"
//                 type="text"
//                 name="typeYourProgram"
//                 onChange={handleInputChange}
//                 value={formData.typeYourProgram}
//                 onBlur={() =>
//                   validateField('typeYourProgram', formData, setErrors)
//                 }
//                 className={errors.typeYourProgram ? 'invalid' : ''}
//               />
//             </AddFormLabel>
//             {!!errors.typeYourProgram && (
//               <ErrorMessage message={errors.typeYourProgram} />
//             )}
//           </AddFormLabelWrapper>
//         </div>
//       )}
//       <AddFormLabelWrapper>
//         <AddFormLabel htmlFor="description">
//           Опис програми:
//           <AddFormInput
//             placeholder="Type description pet"
//             type="text"
//             name="description"
//             onChange={handleInputChange}
//             value={formData.description}
//             onBlur={() => validateField('description', formData, setErrors)}
//             className={errors.description ? 'invalid' : ''}
//           />
//         </AddFormLabel>
//         {!!errors.description && <ErrorMessage message={errors.description} />}
//       </AddFormLabelWrapper>
//       <AddFormLabelWrapper>
//         <AddFormLabel htmlFor="duration">
//           Тривалість програми:
//           <AddFormInput
//             placeholder="Type duration pet"
//             type="text"
//             name="duration"
//             onChange={handleInputChange}
//             value={formData.duration}
//             onBlur={() => validateField('duration', formData, setErrors)}
//             className={errors.duration ? 'invalid' : ''}
//           />
//         </AddFormLabel>
//         {!!errors.duration && <ErrorMessage message={errors.duration} />}
//       </AddFormLabelWrapper>
//       <AddFormLabelWrapper>
//         <AddFormLabel htmlFor="training">
//           Тренування:
//           <AddFormInput
//             placeholder="Type training pet"
//             type="text"
//             name="training"
//             onChange={handleInputChange}
//             value={formData.training}
//             onBlur={() => validateField('training', formData, setErrors)}
//             className={errors.training ? 'invalid' : ''}
//           />
//         </AddFormLabel>
//         {!!errors.training && <ErrorMessage message={errors.training} />}
//       </AddFormLabelWrapper>
//       <AddFormButtonWrapper>
//         <AddFormButtonNext
//           type="button"
//           text="Далі"
//           icon={
//             <MdOutlineFitnessCenter
//               style={{ fill: '#ffff00', width: '20px', height: '20px' }}
//             />
//           }
//           clickHandler={nextStep}
//           filled={false}
//           // isDisabled={isDisabled}
//         />
//         <AddFormButtonBack
//           type="button"
//           clickHandler={backStep}
//           text="Назад"
//           isLink={false}
//         />
//       </AddFormButtonWrapper>
//     </ProgramFormWrapper>
//   );
// };
export default ProgramDetails;
