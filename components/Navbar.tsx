import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <div className="w-screen h-16 border-b-2 border-gray-500 border-opacity-25 rounded-lg shadow-lg">
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
