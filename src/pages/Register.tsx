import { Helmet } from 'react-helmet-async';

import RegisterForm from '@/components/form/RegisterForm';
import RegisterSvg from '@/assets/register.svg';

const Register = () => (
  <>
    <Helmet>
      <title>Register | Diforum - Discussion and Forum App</title>
    </Helmet>

    <h2>📲 Register for your account</h2>

    <section className='mt-10 flex justify-center lg:justify-between'>
      <RegisterForm />
      <img src={RegisterSvg} alt='Register illustration' className='hidden w-[350px] lg:block' />
    </section>
  </>
);

export default Register;
