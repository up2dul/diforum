import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import ProtectedRoute from '@/components/ProtectedRoute';

const Home = lazy(() => import('@/pages/Home'));
const DetailThread = lazy(() => import('@/pages/DetailThread'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const NewThread = lazy(() => import('@/pages/NewThread'));
const Profile = lazy(() => import('@/pages/Profile'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const App = () => (
  <BrowserRouter>
    <HelmetProvider>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/detail/:threadId' element={<DetailThread />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
            <Route
              path='/login'
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='/register'
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='/new-thread'
              element={
                <ProtectedRoute isShouldAuth>
                  <NewThread />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute isShouldAuth>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </HelmetProvider>
  </BrowserRouter>
);

export default App;
