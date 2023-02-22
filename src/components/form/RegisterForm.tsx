import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { asyncRegisterUser } from '@/store/slice/users';
import { registerSchema } from '@/utils/schema';
import Button from '../button/Button';
import InputGroup from './InputGroup';
import type { RegisterInputs } from '@/types';
import type { AppDispatch } from '@/store';

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterInputs> = ({ fullName, email, password }) => {
    dispatch(asyncRegisterUser({ name: fullName, email, password }));
    navigate('/login');
    toast.success('Register successfully');
    toast.success('You can Log in now');
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
      <p>
        Already have an account? Log in{' '}
        <Link to='/login' className='text-link'>
          here
        </Link>
      </p>

      <InputGroup
        placeholder='e.g. John Doe'
        error={errors.fullName?.message}
        {...register('fullName')}
      >
        Full name
      </InputGroup>

      <InputGroup
        type='email'
        placeholder='e.g. john@gmail.com'
        error={errors.email?.message}
        {...register('email')}
      >
        Email
      </InputGroup>

      <InputGroup
        type='password'
        placeholder='min. 6 characters'
        error={errors.password?.message}
        {...register('password')}
      >
        Password
      </InputGroup>

      <InputGroup
        type='password'
        placeholder='min. 6 characters'
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      >
        Confirm password
      </InputGroup>

      <Button isSubmit>Register</Button>
    </form>
  );
};

export default RegisterForm;
