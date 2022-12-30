import * as yup from 'yup';

const lettersAndNumbers = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Enter your email address')
    .max(30, 'Max, 30 characters'),
  password: yup
    .string()
    .required('Enter your password')
    .min(6, 'Min. 6 characters')
    .max(30, 'Max. 30 characters'),
});

const registerSchema = yup.object({
  fullName: yup.string().required('Enter your name').max(32, 'Max, 32 characters'),
  email: yup.string().email('Must be a valid email').required('Enter your email address'),
  password: yup
    .string()
    .required('Enter your password')
    .matches(lettersAndNumbers, 'Password must contain letters and numbers')
    .min(6, 'Min. 6 characters')
    .max(30, 'Max. 30 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm your password'),
});

const threadSchema = yup.object({
  title: yup.string().required('Title is required').max(80, 'Max. 80 characters'),
  category: yup.string().required('Category is required').max(20, 'Max. 20 characters'),
  body: yup.string().required('Content is required'),
});

export { loginSchema, registerSchema, threadSchema };
