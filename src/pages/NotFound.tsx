import { Helmet } from 'react-helmet-async';

import NotFoundSvg from '@/assets/not-found.svg';

const NotFound = () => (
  <>
    <Helmet>
      <title>404 - page not found | Diforum - Discussion and Forum App</title>
    </Helmet>

    <section className='flex flex-col items-center gap-3 text-center'>
      <img src={NotFoundSvg} alt='Page not found illustration' className='w-[350px]' />

      <h2>404 - page not found</h2>
      <p>Oh no! It looks like you&apos;ve stumbled upon a lost page.</p>
    </section>
  </>
);

export default NotFound;
