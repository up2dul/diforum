import { Helmet } from 'react-helmet-async';

import LoginForm from '@/components/form/LoginForm';
import LoginSvg from '@/assets/login.svg';

const Login = () => (
  <>
    <Helmet>
      <title>Log in | Diforum - Discussion and Forum App</title>
    </Helmet>

    <h2>📲 Log in to your account</h2>

    <section className='mt-10 flex justify-center lg:justify-between'>
      <LoginForm />
      <img src={LoginSvg} alt='Login illustration' className='hidden w-[350px] lg:block' />
    </section>
  </>
);

export default Login;
