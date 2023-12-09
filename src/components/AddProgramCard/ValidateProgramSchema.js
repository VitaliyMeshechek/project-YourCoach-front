import * as Yup from 'yup';

export const ValidateProgramSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(16, 'Title must not exceed 16 characters'),
  category: Yup.string()
    .required('Field category is required')
    .oneOf(
      [
        'Фітнес для жінок',
        'Програма схуднення',
        'strength fitness',
        'flexibility and wellnes',
      ],
      'Invalid category'
    ),
  name: Yup.string()
    .required('Field name is required')
    .oneOf(
      [
        'Аеробні програми',
        'Силові програми',
        'Оздоровчі програми',
        'Функціональний фітнес',
      ],
      'Invalid name'
    ),
  fitnessWeigth: Yup.string()
    .required('Field name is required')
    .oneOf(['Аеробіка', 'Аеробний фітнес'], 'Invalid name'),
  fitnessStrength: Yup.string()
    .required('Field name is required')
    .oneOf(
      ['Body Up', 'Body Low', 'Body Pump', 'Body Sculpt', 'ABS'],
      'Invalid name'
    ),
  fitnessWellness: Yup.string()
    .required('Field name is required')
    .oneOf(['Yoga', 'Pilates', 'Stretching'], 'Invalid name'),
  description: Yup.string()
    .required('Field description is required')
    .min(10, 'Title must be at least 10 characters')
    .max(500, 'Title must not exceed 500 characters'),
  training: Yup.string()
    .required('Field training is required')
    .oneOf(
      ['Персональні тренування', 'Групові тренування'],
      'Invalid training'
    ),
  location: Yup.string()
    .required('Location is required')
    .matches(/^[A-Za-z\s]+$/i, 'Invalid location format'),
  comments: Yup.string().test(
    'comments',
    'Comments must be between 10 and 120 characters',
    value => {
      if (!value) {
        return true;
      }
      return value.length >= 10 && value.length <= 120;
    }
  ),
  food: Yup.string()
    .required('Field food is required')
    .oneOf(
      ['Продукти тваринного походження', 'Продукти рослиного походження'],
      'Invalid food'
    ),
  special: Yup.string()
    .required('Field special is required')
    .oneOf(
      [
        'Підбір раціонального харчування',
        'Консультації або поради дієтолога',
        'Можливість тренування старших груп',
      ],
      'Invalid special'
    ),
  avatar: Yup.mixed().test(
    'fileSize',
    'File size must not exceed 3MB',
    value => value && value.size <= 3 * 1024 * 1024
  ),
  duration: Yup.string().oneOf(
    [
      '1-4 тижнів',
      '5-8 тижнів',
      '9-12 тижнів',
      '12-15 тижнів',
      'більше 15 тижнів',
    ],
    'Invalid special'
  ),
});

export const validateField = async (fieldName, value, setErrors) => {
  try {
    await ValidateProgramSchema.validateAt(fieldName, value);
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  } catch (error) {
    console.log(error);
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: error.message,
    }));
  }
};
