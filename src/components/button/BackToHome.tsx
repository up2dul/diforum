import { Link } from 'react-router-dom';
import { IconArrowBackUp } from '@tabler/icons';

const BackToHome = () => (
  <Link to='/' className='text-link mb-5 inline-block'>
    <IconArrowBackUp /> Back to home
  </Link>
);

export default BackToHome;
