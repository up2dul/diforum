import { Link } from 'react-router-dom';

import MenuList from './MenuLink';

const Navbar = () => (
  <nav className='x-container fixed top-0 z-30 flex w-full items-center justify-between bg-como-50 py-3 shadow-md'>
    <h2 className='font-semibold'>
      <Link to='/'>
        💬 <span className='text-green-700'>Di</span>forum
      </Link>
    </h2>

    <MenuList />
  </nav>
);

export default Navbar;
