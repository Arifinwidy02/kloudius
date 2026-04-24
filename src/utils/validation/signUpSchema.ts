import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup.string().trim().min(2, 'Name is too short').required('Name is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

