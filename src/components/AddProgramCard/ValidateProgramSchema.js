import * as Yup from 'yup';

export const ValidateProgramSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(16, 'Title must not exceed 16 characters'),
  // .required('Title is required'),
  category: Yup.string()
    .oneOf(
      [
        'fitnes for women',
        'weigth',
        'strength fitness',
        'flexibility and wellnes',
        'your program',
      ],
      'Виберіть значення'
    )
    .required('Поле обов"язкове для заповнення'),
  name: Yup.string()
  // .oneOf(
  //   [
  //     'Аеробні програми',
  //     'Силові програми',
  //     'Оздоровчі програми',
  //     'Функціональний фітнес',
  //   ],
  //   'Виберіть значення'
  // ),
  .required('Field name is required'),
  kind: Yup.string()
    // .oneOf(
    //   [
    //     'Step Aerobics',
    //     'Fitball Aerobics',
    //     'Body Up',
    //     'Body Pump',
    //     'Тренування ABS',
    //     'Йога',
    //     'Пілатес',
    //     'Ци-гун',
    //     'Стретчінг',
    //     'Калланетіка',
    //     'Zumba',
    //     'Dance Fitness',
    //     'Belly Dance',
    //     'Strip Dance',
    //   ],
    //   'Виберіть значення'
    // )
    .required('Поле обов"язкове для заповнення'),
  fitnessWeigth: Yup.string()
  // .oneOf(
  //   ['Аеробіка', 'Аеробний фітнес'],
  //   'Виберіть значення'
  // ),
  .required('Field name is required'),
  kindProgramWeigth: Yup.string()
    // .oneOf(
    //   [
    //     'Step-Intro',
    //     'Step-B',
    //     'Power-Step',
    //     'Low-Impact Aerobics',
    //     'Low-A',
    //     'Middle-Impact',
    //     'High-Impact',
    //   ],
    //   'Виберіть значення'
    // )
    .required('Поле обов"язкове для заповнення'),
  fitnessStrength: Yup.string()
  // .oneOf(
  //   ['Body Up', 'Body Low', 'Body Pump', 'Body Sculpt', 'ABS'],
  //   'Поле не може бути пустим'
  // ),
  .required('Field name is required'),
  fitnessWellness: Yup.string()
  // .oneOf(
  //   ['Yoga', 'Pilates', 'Stretching'],
  //   'Поле не може бути пустим'
  // ),
  .required('Field name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .test(value => {
      if (!value) {
        return true;
      }
      return value.length >= 10 && value.length <= 500;
    }),
  // .required('Поле необхідно заповнити'),
  duration: Yup.string()
  // .oneOf(
  //   [
  //     '1-4 тижнів',
  //     '5-8 тижнів',
  //     '9-12 тижнів',
  //     '12-15 тижнів',
  //     'більше 15 тижнів',
  //   ],
  //   'duration'
  // ),
  .required('Field duration is required'),
  training: Yup.string()
    // .oneOf(
    //   ['Персональні тренування', 'Групові тренування'],
    //   'Виберіть коректне значення'
    // )
    // .test(('Персональні тренування', 'Групові тренування'), value => {
    //   if (!value) {
    //     return true;
    //   }
    //   return value === 'Персональні тренування' || 'Групові тренування';
    // }),
  .required('Field training is required'),
  location: Yup.string()
  // .matches(/^[A-Za-z\s]+$/i, 'Невірний формат'),
  .required('Location is required'),
  price: Yup.number().positive('Price must be greater than 0'),
  // .required('Price is required'),
  comments: Yup.string()
    .min(10, 'comments must be at least 10 characters')
    .max(400, 'comments must not exceed 400 characters')
    .test(value => {
      if (!value) {
        return true;
      }
      return value.length >= 10 && value.length <= 400;
    }),
  food: Yup.string()
    // .oneOf(
    //   ['Продукти тваринного походження', 'Продукти рослиного походження'],
    //   'Поле не може бути пустим'
    // )
    .required('Field food is required'),
  special: Yup.string()
    .required('Field special is required'),
    // .oneOf(
    //   [
    //     'Підбір раціонального харчування',
    //     'Консультації або поради дієтолога',
    //     'Можливість тренування старших груп',
    //   ],
    //   'Виберіть коректне значення'
    // )
    // .test(
    //   ('Підбір раціонального харчування',
    //   'Консультації або поради дієтолога',
    //   'Можливість тренування старших груп'),
    //   value => {
    //     if (!value) {
    //       return true;
    //     }
    //     return (
    //       value === 'Підбір раціонального харчування' ||
    //       value === 'Консультації або поради дієтолога' ||
    //       value === 'Можливість тренування старших груп'
    //     );
    //   }
    // ),

  avatar: Yup.mixed().test('3 * 1024 * 1024', value => {
    if (!value || value.size <= 3 * 1024 * 1024) {
      return true;
    }
    return value => value && value.size <= 3 * 1024 * 1024;
  }),
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
