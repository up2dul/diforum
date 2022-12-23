import { Link } from 'react-router-dom';

import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
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

        <label>
          Email
          <input
            type='text'
            className='mt-1'
            maxLength={30}
            placeholder='e.g. john@gmail.com'
            autoComplete='off'
            required
          />
        </label>

        <label>
          Password
          <input
            type='password'
            className='mt-1'
            maxLength={30}
            placeholder='******'
            autoComplete='off'
            required
          />
        </label>

        <Button isSubmit>Log in</Button>
      </form>

      <img src={LoginSvg} alt='Login illustration' className='hidden w-[350px] lg:block' />
    </section>
  </>
);

export default Login;
