import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { asyncPreloadProcess } from '@/store/slice/is-preload';
import { asyncRegisterUser } from '@/store/slice/users';
import { registerSchema } from '@/utils/schema';
import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
import InputGroup from '@/components/InputGroup';
import RegisterSvg from '@/assets/register.svg';
import type { AppDispatch } from '@/store';

type Inputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(registerSchema) });

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSubmit: SubmitHandler<Inputs> = ({ fullName, email, password }) => {
    dispatch(asyncRegisterUser({ name: fullName, email, password }));
    navigate('/login');
    toast('Register successfully');
    toast('You can Log in now');
  };

  return (
    <>
      <Helmet>
        <title>Register | Diforum - Discussion and Forum App</title>
      </Helmet>

      <BackToHome />
      <h2>📲 Register for your account</h2>

      <section className='mt-10 flex justify-center lg:justify-between'>
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

        <img src={RegisterSvg} alt='Register illustration' className='hidden w-[350px] lg:block' />
      </section>
    </>
  );
};

export default Register;
