import { Link } from 'react-router-dom';
import { IconArrowBackUp } from '@tabler/icons';

const BackToHome = () => (
  <Link to='/' className='mb-5 inline-block text-green-700 hover:underline'>
    <IconArrowBackUp /> Back to home
  </Link>
);

export default BackToHome;
