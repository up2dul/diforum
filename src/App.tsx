import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthProvider from '@/components/AuthProvider';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';

const Home = lazy(() => import('@/pages/Home'));
const DetailThread = lazy(() => import('@/pages/DetailThread'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const App = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:threadId' element={<DetailThread />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route
            path='/login'
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
          <Route
            path='/register'
            element={
              <AuthProvider>
                <Register />
              </AuthProvider>
            }
          />
          <Route
            path='/profile'
            element={
              <AuthProvider isShouldAuth>
                <Profile />
              </AuthProvider>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default App;
