import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { threadSchema } from '@/utils/schema';
import Button from '../button/Button';
import InputGroup from './InputGroup';
import Tiptap from './Tiptap';
import type { NewThread as Inputs } from '@/types';

const NewThreadForm = ({ onSubmit }: { onSubmit: (data: Inputs) => void }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(threadSchema) });

  return (
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
  );
};

export default NewThreadForm;
