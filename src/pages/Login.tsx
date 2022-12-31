import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { asyncSetAuthUser } from '@/store/slice/auth-user';
import LoginForm from '@/components/form/LoginForm';
import LoginSvg from '@/assets/login.svg';
import type { AppDispatch } from '@/store';
import type { LoginInputs } from '@/types';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(asyncSetAuthUser(data));
    toast.success('Log in successfully');
  };

  return (
    <>
      <Helmet>
        <title>Log in | Diforum - Discussion and Forum App</title>
      </Helmet>

      <h2>📲 Log in to your account</h2>

      <section className='mt-10 flex justify-center lg:justify-between'>
        <LoginForm onSubmit={handleSubmit} />
        <img src={LoginSvg} alt='Login illustration' className='hidden w-[350px] lg:block' />
      </section>
    </>
  );
};

export default Login;
