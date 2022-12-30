import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';

import { asyncAddThread } from '@/store/slice/threads';
import { threadSchema } from '@/utils/schema';
import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
import InputGroup from '@/components/InputGroup';
import Tiptap from '@/components/Tiptap';
import NewThreadSvg from '@/assets/new-thread.svg';
import type { AppDispatch } from '@/store';
import type { NewThread as Inputs } from '@/types';

const NewThread = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(threadSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(asyncAddThread(data));
    navigate('/');
  };

  return (
    <>
      <BackToHome />
      <h2>✍️ Create new thread</h2>

      <section className='mt-10 flex items-center justify-center lg:justify-between'>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            placeholder='e.g. Hello world'
            error={errors.title?.message}
            {...register('title')}
          >
            Title
          </InputGroup>
          <InputGroup
            placeholder='e.g. technology'
            error={errors.category?.message}
            {...register('category')}
          >
            Category
          </InputGroup>
          <div>
            <label>Thread content</label>
            <Controller
              control={control}
              name='body'
              render={({ field: { value, onChange } }) => (
                <Tiptap
                  limitChar={1000}
                  content={value}
                  placeholder='Your thread content here'
                  error={errors.body?.message}
                  onUpdate={onChange}
                />
              )}
            />
          </div>

          <Button isSubmit>Create</Button>
        </form>

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
