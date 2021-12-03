import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
