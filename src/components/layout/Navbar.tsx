import { Link } from 'react-router-dom';

import MenuList from './MenuLink';
import Logo from '@/assets/logo.png';

const Navbar = () => (
  <nav className='x-container fixed top-0 z-30 flex w-full items-center justify-between bg-como-50 py-3 shadow-md'>
    <Link to='/'>
      <img src={Logo} alt='Diforum logo' className='h-7' />
    </Link>

    <MenuList />
  </nav>
);

export default Navbar;
