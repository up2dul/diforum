import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { asyncPreloadProcess } from '@/store/slice/is-preload';
import type { AppDispatch, RootState } from '@/store';

type AuthProviderProps = {
  isShouldAuth?: boolean;
  children: React.ReactElement;
};

const AuthProvider = ({ isShouldAuth = false, children }: AuthProviderProps) => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const isPreload = useSelector((state: RootState) => state.isPreload.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) return null;

  if (isShouldAuth) return authUser ? children : <Navigate to='/login' />;

  return authUser === null ? children : <Navigate to='/' />;
};

export default AuthProvider;
