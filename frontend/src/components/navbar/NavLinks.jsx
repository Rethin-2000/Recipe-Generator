import React from 'react';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButton';

const NavLinks = ({ isUserLoggedIn }) => {
  return (
    <div className="hidden md:flex items-center space-x-6 font-sans text-sm">
      
      {isUserLoggedIn && (
        <>
        <Link to="/" className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold">
        Home
      </Link>
      <Link to="/recipeGenerator" className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold">
        RecipeGenerator
      </Link>
          <Link to="/post" className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold">
            Post
          </Link>
          <Link to="/favorites" className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold">
            Favorites
          </Link>
          <Link to="/my-recipes" className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold">
            My Recipes
          </Link>
          <Link to="/profile" className="text-black hover:bg-neutral-900 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 font-bold">
            Profile
          </Link>
        </>
      )}
      <AuthButtons isUserLoggedIn={isUserLoggedIn} />
    </div>
  );
};

export default React.memo(NavLinks);