import React from 'react';
import { useAuth } from '../../context/UserContext.jsx';
import Logo from './Logo';
import NavLinks from './NavLinks';

const Navbar = () => {
  const { isUserLoggedIn } = useAuth();

  return (
    <nav className="bg-white text-neutral-900 shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <NavLinks isUserLoggedIn={isUserLoggedIn} />
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);