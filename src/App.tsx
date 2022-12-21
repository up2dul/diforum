import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/Layout';
import Loader from '@/components/Loader';

const Home = lazy(() => import('@/pages/Home'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));

const App = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default App;
