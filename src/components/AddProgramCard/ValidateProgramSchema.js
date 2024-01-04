import * as Yup from 'yup';

export const ValidateProgramSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(16, 'Title must not exceed 16 characters'),
  // .required('Title is required'),
  category: Yup.string()
    .oneOf(
      [
        'Фітнес для жінок',
        'Програма схуднення',
        'strength fitness',
        'flexibility and wellnes',
      ],
      'Invalid category'
    )
    .required('Field category is required'),
  name: Yup.string()
    .oneOf(
      [
        'Аеробні програми',
        'Силові програми',
        'Оздоровчі програми',
        'Функціональний фітнес',
      ],
      'Invalid name'
    )
    .required('Field name is required'),
  aerobic: Yup.string()
    .oneOf(['Step Aerobics', 'Fitball Aerobics', 'Інше'], 'aerobic')
    .required('Field aerobic is required'),
  fitnessWeigth: Yup.string()
    .oneOf(['Аеробіка', 'Аеробний фітнес'], 'Поле не може бути пустим')
    .required('Field name is required'),
  fitnessStrength: Yup.string()
    .oneOf(
      ['Body Up', 'Body Low', 'Body Pump', 'Body Sculpt', 'ABS'],
      'Поле не може бути пустим'
    )
    .required('Field name is required'),
  fitnessWellness: Yup.string()
    .oneOf(['Yoga', 'Pilates', 'Stretching'], 'Поле не може бути пустим')
    .required('Field name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .test(value => {
      if (!value) {
        return true;
      }
      return value.length >= 10 && value.length <= 500;
    })
    .required('Поле необхідно заповнити'),
  duration: Yup.string()
    .oneOf(
      [
        '1-4 тижнів',
        '5-8 тижнів',
        '9-12 тижнів',
        '12-15 тижнів',
        'більше 15 тижнів',
      ],
      'duration'
    )
    .required('Field duration is required'),
  training: Yup.string()
    .oneOf(['Персональні тренування', 'Групові тренування'], 'training')
    .required('Field training is required'),
  location: Yup.string()
    .matches(/^[A-Za-z\s]+$/i, 'Невірний формат')
    .required('Location is required'),
  price: Yup.number()
    .positive('Price must be greater than 0')
    .required('Price is required'),
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
    .oneOf(
      ['Продукти тваринного походження', 'Продукти рослиного походження'],
      'Поле не може бути пустим'
    )
    .required('Field food is required'),
  special: Yup.string()
    .oneOf(
      [
        'Підбір раціонального харчування',
        'Консультації або поради дієтолога',
        'Можливість тренування старших груп',
      ],
      'Поле не може бути пустим'
    )
    .required('Field special is required'),
  avatarUrl: Yup.mixed().test(
    'fileSize',
    'File size must not exceed 3MB',
    value => value && value.size <= 3 * 1024 * 1024
  ),
  nameYourProgram: Yup.string()
    .min(3, 'Description must be at least 10 characters')
    .max(30, 'Description must not exceed 30 characters')
    .required('Поле необхідно заповнити'),
  typeYourProgram: Yup.string()
    .min(3, 'Description must be at least 10 characters')
    .max(30, 'Description must not exceed 30 characters')
    .required('Поле необхідно заповнити'),
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
