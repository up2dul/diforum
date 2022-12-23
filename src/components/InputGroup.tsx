type InputGroupProps = {
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  children: string;
};

const InputGroup = ({ type = 'text', placeholder, children }: InputGroupProps) => (
  <label>
    {children}
    <input
      type={type}
      className='mt-1'
      maxLength={30}
      placeholder={placeholder}
      autoComplete='off'
      required
    />
  </label>
);

export default InputGroup;
