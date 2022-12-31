import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { asyncRegisterUser } from '@/store/slice/users';
import RegisterForm from '@/components/form/RegisterForm';
import RegisterSvg from '@/assets/register.svg';
import type { AppDispatch } from '@/store';
import type { RegisterInputs } from '@/types';

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<RegisterInputs> = ({ fullName, email, password }) => {
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

      <h2>📲 Register for your account</h2>

      <section className='mt-10 flex justify-center lg:justify-between'>
        <RegisterForm onSubmit={handleSubmit} />
        <img src={RegisterSvg} alt='Register illustration' className='hidden w-[350px] lg:block' />
      </section>
    </>
  );
};

export default Register;
