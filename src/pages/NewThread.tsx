import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import type { SubmitHandler } from 'react-hook-form';

import { asyncAddThread } from '@/store/slice/threads';
import NewThreadForm from '@/components/form/NewThreadForm';
import NewThreadSvg from '@/assets/new-thread.svg';
import type { AppDispatch } from '@/store';
import type { NewThread as Inputs } from '@/types';

const NewThread = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(asyncAddThread(data));
    navigate('/');
    toast('New thread posted');
  };

  return (
    <>
      <Helmet>
        <title>Create new thread | Diforum - Discussion and Forum App</title>
      </Helmet>

      <h2>✍️ Create new thread</h2>

      <section className='mt-10 flex items-center justify-center lg:justify-between'>
        <NewThreadForm onSubmit={handleSubmit} />
        <img
          src={NewThreadSvg}
          alt='New thread illustration'
          className='hidden w-[350px] lg:block'
        />
      </section>
    </>
  );
};

export default NewThread;
