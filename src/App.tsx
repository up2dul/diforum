import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { asyncSetAuthUser, asyncUnsetAuthUser } from '@/store/slice/auth-user';
import { asyncPreloadProcess } from '@/store/slice/is-preload';
import { asyncReceiveThreads } from '@/store/slice/threads';
import type { AppDispatch, RootState } from '@/store';

const App = () => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const threads = useSelector((state: RootState) => state.threads.list);
  const dispatch = useDispatch<AppDispatch>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  const handleLogin = () => {
    const email = emailRef.current?.value as string;
    const password = passwordRef.current?.value as string;
    dispatch(asyncSetAuthUser({ email, password }));
  };

  const handleLogout = () => dispatch(asyncUnsetAuthUser());

  return (
    <>
      <button type='button' onClick={() => console.log('threads:', threads)}>
        log threads
      </button>

      {authUser === null ? (
        <div>
          <h2>You&apos;re logged out</h2>

          <form>
            <input ref={emailRef} type='email' placeholder='Your email' autoComplete='off' />
            <br />
            <input
              ref={passwordRef}
              type='password'
              placeholder='Your password'
              autoComplete='off'
            />

            <button type='button' onClick={handleLogin}>
              Log in now!
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>You&apos;re logged in</h2>

          <button type='button' onClick={handleLogout}>
            Log out!
          </button>

          <h3>Hi {authUser?.name}</h3>

          <p>{authUser?.email}</p>
        </div>
      )}
    </>
  );
};

export default App;
