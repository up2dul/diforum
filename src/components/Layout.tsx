import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import BackToHome from './BackToHome';
import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />

      <main className='x-container mt-[70px] pt-10 pb-16'>
        {pathname !== '/' && <BackToHome />}
        {children}
      </main>

      <Toaster position='bottom-right' toastOptions={{ className: 'bg-green-50' }} />
    </>
  );
};

export default Layout;
