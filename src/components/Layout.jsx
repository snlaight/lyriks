import { Sidebar } from './';

const Layout = ({ children }) => {
  return (
    <div className='h-screen overflow-y-auto scrollbar-w-4 scrollbar-track-transparent scrollbar-thumb-phoenix-light-green scrollbar-thumb-rounded-xl'>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default Layout;
