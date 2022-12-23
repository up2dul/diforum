import { Link } from 'react-router-dom';

import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
import InputGroup from '@/components/InputGroup';
import LoginSvg from '@/assets/login.svg';

const Login = () => (
  <>
    <BackToHome />
    <h2>📲 Log in to your account</h2>

    <section className='mt-10 flex justify-center lg:justify-between'>
      <form className='flex flex-col gap-5'>
        <p>
          New in here? register new account{' '}
          <Link to='/register' className='text-link'>
            here
          </Link>
        </p>

        <InputGroup type='email' placeholder='e.g. john@gmail.com'>
          Email
        </InputGroup>

        <InputGroup type='password' placeholder='******'>
          Password
        </InputGroup>

        <Button isSubmit>Log in</Button>
      </form>

      <img src={LoginSvg} alt='Login illustration' className='hidden w-[350px] lg:block' />
    </section>
  </>
);

export default Login;
