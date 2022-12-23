type InputGroupProps = {
  type?: 'text' | 'email' | 'password';
  minLength?: number;
  placeholder: string;
  children: string;
};

const InputGroup = ({ type = 'text', minLength = 3, placeholder, children }: InputGroupProps) => (
  <label>
    {children}
    <input
      type={type}
      className='mt-1'
      minLength={minLength}
      maxLength={30}
      placeholder={placeholder}
      autoComplete='off'
      required
    />
  </label>
);

export default InputGroup;
