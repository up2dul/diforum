import { ThreeDots } from 'react-loader-spinner';

const Loader = () => (
  <section className='mt-12 flex w-full justify-center'>
    <ThreeDots
      height='80'
      width='80'
      radius={9}
      color='#19ce4d'
      ariaLabel='three-dots-loading'
      visible={true}
    />
  </section>
);

export default Loader;
