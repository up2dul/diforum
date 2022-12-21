import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';

import { menuLinkItems } from '@/utils';

const MenuList = () => (
  <Menu as='div' className='relative'>
    <Menu.Button className='px-1 text-5xl'> =</Menu.Button>

    <Menu.Items
      as='div'
      className='absolute right-0 top-12 flex w-36 flex-col gap-1 rounded-md border border-como-300 bg-como-50 py-1'
    >
      {menuLinkItems.map(({ href, content }) => (
        <Menu.Item key={href} as={Fragment}>
          <Link to={href} className='py-1 px-2 font-medium hover:bg-green-200'>
            {content}
          </Link>
        </Menu.Item>
      ))}
    </Menu.Items>
  </Menu>
);

export default MenuList;
