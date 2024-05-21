// create links for login, proejcts, donate, create project
"use client";

import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="text-white font-bold text-3xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer">
          Donation Tracker
        </div>

        <div className="lg:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <div className="lg:flex flex-col lg:flex-row lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-xl">
          <Link href="/projects">
            <button className="text-white px-4 py-2 hover:text-orange-600 focus:outline-none">Projects</button>
          </Link>
          <Link href="/donate">
            <button className="text-white px-4 py-2 hover:text-orange-600 focus:outline-none">Donate</button>
          </Link>
          <Link href="/login">
            <button className="text-white px-4 py-2 hover:text-orange-600 focus:outline-none">Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





