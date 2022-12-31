import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '@/utils/schema';
import Button from '../button/Button';
import InputGroup from './InputGroup';
import type { LoginInputs } from '@/types';

const LoginForm = ({ onSubmit }: { onSubmit: (data: LoginInputs) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: yupResolver(loginSchema) });

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
