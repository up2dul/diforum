import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email')
    .max(30, 'Max, 30 characters')
    .required('Enter your email address'),
  password: yup
    .string()
    .required('Enter your password')
    .min(6, 'Min. 6 characters')
    .max(30, 'Max. 30 characters'),
});

const registerSchema = yup.object({
  fullName: yup.string().max(32, 'Max, 32 characters').required('Enter your email address'),
  email: yup.string().email('Must be a valid email').required('Enter your email address'),
  password: yup
    .string()
    .required('Enter your password')
    .min(6, 'Min. 6 characters')
    .max(30, 'Max. 30 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm your password'),
});

export { loginSchema, registerSchema };
