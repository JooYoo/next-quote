import ThemeToggle from '../components/ThemeToggle';
import Navbar from '../components/Navbar';

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default Layout;
