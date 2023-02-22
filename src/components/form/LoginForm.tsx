import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { loginSchema } from '@/utils/schema';
import Button from '../button/Button';
import InputGroup from './InputGroup';
import { asyncSetAuthUser } from '@/store/slice/auth-user';
import type { LoginInputs } from '@/types';
import type { AppDispatch, RootState } from '@/store';

const LoginForm = () => {
  const { error } = useSelector((state: RootState) => state.authUser);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(asyncSetAuthUser(data));
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
      <p>
        New in here? register new account{' '}
        <Link to='/register' className='text-link'>
          here
        </Link>
      </p>

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
        placeholder='******'
        error={errors.password?.message}
        {...register('password')}
      >
        Password
      </InputGroup>

      <Button isSubmit>Log in</Button>
    </form>
  );
};

export default LoginForm;
