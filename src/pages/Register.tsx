import { Link } from 'react-router-dom';

import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
import InputGroup from '@/components/InputGroup';
import RegisterSvg from '@/assets/register.svg';

const Register = () => (
  <>
    <BackToHome />
    <h2>📲 Register for your account</h2>

    <section className='mt-10 flex justify-center lg:justify-between'>
      <form className='flex flex-col gap-5'>
        <p>
          Already have an account? Log in{' '}
          <Link to='/login' className='text-link'>
            here
          </Link>
        </p>

        <InputGroup placeholder='e.g. John Doe'>Full name</InputGroup>

        <InputGroup type='email' placeholder='e.g. john@gmail.com'>
          Email
        </InputGroup>

        <InputGroup type='password' minLength={6} placeholder='min. 6 characters'>
          Password
        </InputGroup>

        <InputGroup type='password' minLength={6} placeholder='same as Password input'>
          Confirm password
        </InputGroup>

        <Button isSubmit>Register</Button>
      </form>

      <img src={RegisterSvg} alt='Register illustration' className='hidden w-[350px] lg:block' />
    </section>
  </>
);

export default Register;
