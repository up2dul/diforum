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

export { loginSchema, registerSchema };
