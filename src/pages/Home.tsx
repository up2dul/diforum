import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { asyncPreloadProcess } from '@/store/slice/is-preload';
import { asyncReceiveThreads } from '@/store/slice/threads';
import { asyncReceiveUsers } from '@/store/slice/users';
import ThreadCard from '@/components/ThreadCard';
import type { AppDispatch, RootState } from '@/store';
import type { Thread } from '@/types';

const Home = () => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const threads = useSelector((state: RootState) => state.threads.list);
  const users = useSelector((state: RootState) => state.users.list);
  const dispatch = useDispatch<AppDispatch>();
  const threadsWithAuthor = threads.map((thread: Thread) => ({
    ...thread,
    author: users.find((user) => user.id === thread.ownerId)?.name,
  }));

  useEffect(() => {
    dispatch(asyncPreloadProcess());
    dispatch(asyncReceiveThreads());
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Diforum - Discussion and Forum App</title>
      </Helmet>

      {authUser ? (
        <h2>👋 Hi, {authUser.name}!</h2>
      ) : (
        <h2>
          ✏️ Join and start a thread, by{' '}
          <Link to='/register' className='text-link'>
            register
          </Link>{' '}
          your account now!
        </h2>
      )}

      <section className='mt-10 flex flex-col gap-7'>
        {threadsWithAuthor.map((thread: Thread) => (
          <ThreadCard key={thread.id} {...thread} />
        ))}
      </section>
    </>
  );
};

export default Home;
