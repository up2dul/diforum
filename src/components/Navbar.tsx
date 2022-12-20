import { Link } from 'react-router-dom';

import MenuList from './MenuLink';

const Navbar = () => (
  <nav className='x-container border-slate-900 fixed top-0 z-30 flex w-full items-center justify-between border-b-2 bg-light py-4'>
    <h2 className='font-medium'>
      <Link to='/'>💬 Diforum</Link>
    </h2>

    <MenuList />
  </nav>
);

export default Navbar;
