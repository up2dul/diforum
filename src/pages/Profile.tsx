import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { asyncPreloadProcess } from '@/store/slice/is-preload';
import { asyncReceiveLeaderboard } from '@/store/slice/leaderboard';
import { asyncReceiveThreads } from '@/store/slice/threads';
import { asyncUnsetAuthUser } from '@/store/slice/auth-user';
import { threadsCount } from '@/utils';
import BackToHome from '@/components/BackToHome';
import Button from '@/components/Button';
import ProfileSvg from '@/assets/profile.svg';
import type { AppDispatch, RootState } from '@/store';

const Profile = () => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const leaderboard = useSelector((state: RootState) => state.leaderboard.list);
  const threads = useSelector((state: RootState) => state.threads.list);
  const dispatch = useDispatch<AppDispatch>();
  const { avatar, name, email, score, totalThreads } = {
    ...authUser,
    score: leaderboard.find(({ user }) => authUser?.id === user.id)?.score || 0,
    totalThreads: threads.filter((thread) => authUser?.id === thread.ownerId).length,
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
    dispatch(asyncReceiveLeaderboard());
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  const handleLogout = () => dispatch(asyncUnsetAuthUser());

  return (
    <>
      <BackToHome />
      <h2>🙂 My profile</h2>

      <section className='mt-10 flex items-center justify-center text-center md:justify-between md:text-left lg:mt-8'>
        <div className='flex flex-col gap-1'>
          <img src={avatar} alt='User avatar' className='mx-auto w-16 rounded-full md:mx-0' />
          <h2>{name}</h2>
          <h3>{email}</h3>
          <h3>{threadsCount(totalThreads)}</h3>
          <h3>Score: {score}</h3>

          <hr className='my-3' />

          <Button onClick={handleLogout}>Log out</Button>
        </div>

        <img
          src={ProfileSvg}
          alt='Profile illustration'
          className='hidden w-[300px] md:block lg:w-[350px]'
        />
      </section>
    </>
  );
};

export default Profile;
