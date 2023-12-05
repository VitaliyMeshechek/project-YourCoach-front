import * as Yup from 'yup';

export const ValidateProgramSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Name must be at least 2 characters')
    .max(16, 'Name must not exceed 16 characters'),
  category: Yup.string()
    .required('Field category is required')
    .oneOf(
      [
        'fitnes for women',
        'weight Loss Program',
        'strength fitness',
        'flexibility and wellnes',
      ],
      'Invalid category'
    ),
  name: Yup.string()
    .required('Field name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(26, 'Name must not exceed 26 characters')
    .oneOf(
      [
        'Аеробні програми',
        'Силові програми',
        'Оздоровчі програми',
        'Функціональний фітнес',
        'Аеробіка',
        'Аеробний фітнес',
        'Body Up',
        'Body Low',
        'Body Pump',
        'Body Sculpt',
        'ABS',
        'Yoga',
        'Pilates',
        'Stretching',
      ],
      'Invalid training'
    ),
  description: Yup.string()
    .required('Field description is required')
    .test(value => {
      if (!value) {
        return true;
      }
      return value.length >= 10 && value.length <= 320;
    }),
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
      '1-4 тижні',
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
