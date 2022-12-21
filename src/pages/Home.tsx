import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { asyncReceiveThreads } from '@/store/slice/threads';
import { asyncReceiveUsers } from '@/store/slice/users';
import ThreadCard from '@/components/ThreadCard';
import type { AppDispatch, RootState } from '@/store';
import type { Thread } from '@/types';

const Home = () => {
  const threads = useSelector((state: RootState) => state.threads.list);
  const users = useSelector((state: RootState) => state.users.list);
  const dispatch = useDispatch<AppDispatch>();
  const threadsWithAuthor = threads.map((thread: Thread) => ({
    ...thread,
    author: users.find((user) => user.id === thread.ownerId)?.name,
  }));

  useEffect(() => {
    dispatch(asyncReceiveThreads());
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  return (
    <>
      <h2>✏️ Join and start a thread, by register your account now!</h2>

      <section className='mt-12 flex flex-col gap-7'>
        {threadsWithAuthor.map((thread) => (
          <ThreadCard key={thread.id} {...thread} />
        ))}
      </section>
    </>
  );
};

export default Home;
