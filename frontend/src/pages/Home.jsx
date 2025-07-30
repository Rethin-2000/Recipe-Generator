import React from 'react';
import RecipeCarousel from '../components/RecipieCorsoul';
import RecipeCard from '../components/RecipieCard';
import { usePost } from '../context/PostContext';

const Home = () => {
  const { recipes } = usePost();

  return (
    <div className="min-h-screen mt-10 px-4 md:px-10 bg-white">
      
      {/* Hero Carousel */}
      <div className="mb-8">
        <RecipeCarousel />
      </div>

      {/* Recipe List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      
    </div>
  );
};

export default Home;
