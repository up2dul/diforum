import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import { menuLinkItems } from '@/utils';

const MenuList = () => (
  <Menu as='div' className='relative'>
    <Menu.Button className='px-1 text-5xl'> =</Menu.Button>

    <Transition
      enter='transition duration-100 ease-out'
      enterFrom='transform scale-95 opacity-0'
      enterTo='transform scale-100 opacity-100'
      leave='transition duration-75 ease-out'
      leaveFrom='transform scale-100 opacity-100'
      leaveTo='transform scale-95 opacity-0'
    >
      <Menu.Items
        as='div'
        className='absolute right-0 flex w-36 flex-col gap-1 rounded-md border-2 border-como-300 bg-como-50 py-1'
      >
        {menuLinkItems.map(({ href, content }) => (
          <Menu.Item key={href} as={Fragment}>
            <Link to={href} className='py-1 px-2 font-medium hover:bg-green-200'>
              {content}
            </Link>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
);

export default MenuList;
