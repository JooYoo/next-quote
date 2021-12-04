import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0" style={{ position: 'sticky', top: '0' }}>
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
