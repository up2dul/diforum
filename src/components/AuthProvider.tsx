import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { asyncPreloadProcess } from '@/store/slice/is-preload';
import type { AppDispatch, RootState } from '@/store';

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const authUser = useSelector((state: RootState) => state.authUser.value);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return authUser === null ? children : <Navigate to='/' />;
};

export default AuthProvider;
