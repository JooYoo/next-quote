import ThemeToggle from './ThemeToggle';

const Layout = ({ children }: any) => {
  return (
    <div>
      <ThemeToggle />
      {children}
    </div>
  );
};

export default Layout;
