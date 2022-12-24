import { forwardRef } from 'react';
import type { ChangeHandler } from 'react-hook-form';
import clsx from 'clsx';

type InputGroupProps = {
  name: string;
  type?: 'text' | 'password';
  placeholder: string;
  error?: string;
  children: string;
  onBlur: ChangeHandler;
  onChange: ChangeHandler;
};

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ name, type = 'text', placeholder, error, children, onBlur, onChange }, ref) => (
    <label>
      {children}
      <input
        ref={ref}
        name={name}
        type={type}
        className={clsx('mt-1', error && 'border-danger focus:outline-danger')}
        placeholder={placeholder}
        autoComplete='off'
        onBlur={onBlur}
        onChange={onChange}
      />
      <p className='text-sm text-danger'>{error}</p>
    </label>
  ),
);

InputGroup.displayName = 'InputGroup';
export default InputGroup;
