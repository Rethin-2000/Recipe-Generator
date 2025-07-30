import { Link } from 'react-router-dom';
import { useFavourite } from '../context/FavouriteContext';
import { useAuth } from '../context/UserContext';
import { usePost } from '../context/PostContext';

const RecipeCard = ({ recipe }) => {
  const { isFavorited, toggleFavorite } = useFavourite();
  const { user } = useAuth();
  const { deleteRecipe } = usePost();

  const handleToggle = async () => {
    await toggleFavorite(recipe);
  };

  return (
    <div className="relative w-full max-w-sm h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div
        className="w-full h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold shadow-md text-black">
          <span>{recipe.isVeg ? 'Veg' : 'Non-Veg'}</span>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
          <h3 className="text-2xl font-bold mb-3">{recipe.title}</h3>

          <button className="text-sm bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-200">
            <Link to={`/recipes/${recipe.id}`}>View All Recipes</Link>
          </button>

          <button
            className="absolute top-3 left-3 bg-black bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold shadow-md text-white"
            onClick={handleToggle}
          >
            <span>{isFavorited(recipe.id) ? '❤️' : '🤍'}</span>
          </button>

          {/* Delete Button */}
         {recipe.userId === user.uid && (
          <button
            className="absolute bottom-3 right-3 bg-black bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold shadow-md text-white"
            
          >
            <span className='text-red-500' 
            onClick={() => deleteRecipe(recipe.id)}
            >
              delete🗑️
            </span>
          </button>
         )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
