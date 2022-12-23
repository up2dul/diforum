import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { asyncReceiveLeaderboard } from '@/store/slice/leaderboard';
import BackToHome from '@/components/BackToHome';
import type { AppDispatch, RootState } from '@/store';

const Leaderboard = () => {
  const leaderboard = useSelector((state: RootState) => state.leaderboard.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);

  return (
    <>
      <BackToHome />
      <h2>🏆 Active users leaderboard</h2>

      <section className='mt-10'>
        <div className='mb-4 flex justify-between border-b border-como-400 pb-1'>
          <h3>User</h3>

          <h3>Score</h3>
        </div>

        <div className='flex flex-col'>
          {leaderboard.map(({ score, user }, idx) => (
            <article
              key={user.id}
              className={`flex items-center justify-between p-2 ${idx % 2 === 0 && 'bg-green-200'}`}
            >
              <div className='flex items-center gap-2'>
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className='w-11 rounded-full'
                />
                <h3>{user.name}</h3>
              </div>

              <h3>{score}</h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Leaderboard;
