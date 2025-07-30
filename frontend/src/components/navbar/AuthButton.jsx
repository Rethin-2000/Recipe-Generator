import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const AuthButtons = ({ isUserLoggedIn }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return isUserLoggedIn ? (
    <button
      onClick={handleLogout}
      className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold"
    >
      Logout
    </button>
  ) : (
    <>
      <Link to="/login" className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold">
        Login
      </Link>
      <Link to="/signup" className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold">
        Sign Up
      </Link>
    </>
  );
};

export default React.memo(AuthButtons);
