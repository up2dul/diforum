import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { IconList } from '@tabler/icons';

const MenuList = () => (
  <Menu as='div' className='relative'>
    <Menu.Button className='border-slate-900 bg-yellow-400 rounded-lg border-2 bg-yellow p-1'>
      <IconList />
    </Menu.Button>

    <Menu.Items
      as='div'
      className='absolute right-0 flex w-36 flex-col gap-1 rounded-md border bg-light p-1'
    >
      <Menu.Item as={Fragment}>
        <Link to='/leaderboard' className='p-1 hover:bg-sky'>
          🏆 Leaderboard
        </Link>
      </Menu.Item>
      <Menu.Item as={Fragment}>
        <Link to='/profile' className='p-1 hover:bg-sky'>
          🙂 Profile
        </Link>
      </Menu.Item>
    </Menu.Items>
  </Menu>
);

export default MenuList;
