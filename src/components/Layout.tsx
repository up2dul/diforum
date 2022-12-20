import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />

    <main className='x-container mt-[70px] py-10'>{children}</main>
  </>
);

export default Layout;
