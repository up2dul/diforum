import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { asyncPreloadProcess } from '@/store/slice/is-preload';
import { asyncSetAuthUser } from '@/store/slice/auth-user';
import { loginSchema } from '@/utils/schema';
import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
import InputGroup from '@/components/InputGroup';
import LoginSvg from '@/assets/login.svg';
import type { AppDispatch } from '@/store';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(asyncSetAuthUser(data));
    toast('Log in successfully');
  };

  return (
    <>
      <Helmet>
        <title>Log in | Diforum - Discussion and Forum App</title>
      </Helmet>

      <BackToHome />
      <h2>📲 Log in to your account</h2>

      <section className='mt-10 flex justify-center lg:justify-between'>
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

        <img src={LoginSvg} alt='Login illustration' className='hidden w-[350px] lg:block' />
      </section>
    </>
  );
};

export default Login;
