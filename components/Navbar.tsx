import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { ViewBoardsIcon, BookmarkAltIcon } from '@heroicons/react/outline';

const Navbar = () => {
  return (
    <div className="flex flex-row gap-10 place-content-end py-4 px-7 border-b-2 border-gray-500 border-opacity-25 rounded-lg shadow-lg">
      <div className="flex flex-grow justify-between">
        {/* <Link href="/"> */}
        <span className="text-2xl" role="button">
          ❝
        </span>
        {/* </Link> */}
        <div className="flex flex-row gap-5">
          {/* <Link href="/"> */}
          <BookmarkAltIcon className="w-7 h-7" role="button" />
          {/* </Link> */}
          {/* <Link href="/books"> */}
          <ViewBoardsIcon className="w-7 h-7" role="button" />
          {/* </Link> */}
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
