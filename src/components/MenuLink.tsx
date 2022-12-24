import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import { asyncPreloadProcess } from '@/store/slice/is-preload';
import { menuLinkItems } from '@/utils';
import type { AppDispatch, RootState } from '@/store';

const MenuList = () => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const filterMenuLinkItems = () => {
    if (authUser) {
      return menuLinkItems.filter(({ visible }) => visible !== 'no-auth');
    }
    return menuLinkItems.filter(({ visible }) => visible !== 'auth');
  };

  return (
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
          {filterMenuLinkItems().map(({ href, content }) => (
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
};

export default MenuList;
