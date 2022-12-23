import BackToHome from '@/components/BackToHome';
import NotFoundSvg from '@/assets/not-found.svg';

const NotFound = () => (
  <section className='flex flex-col items-center gap-3 text-center'>
    <img src={NotFoundSvg} alt='Page not found illustration' className='w-[350px]' />

    <h2>404 - page not found</h2>
    <p>Oh no! It looks like you&apos;ve stumbled upon a lost page.</p>

    <BackToHome />
  </section>
);

export default NotFound;
