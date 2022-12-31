import { Toaster } from 'react-hot-toast';

import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />

    <main className='x-container mt-[70px] pt-10 pb-16'>{children}</main>

    <Toaster position='bottom-right' toastOptions={{ className: 'bg-green-50' }} />
  </>
);

export default Layout;
