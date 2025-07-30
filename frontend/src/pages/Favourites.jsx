import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipieCard';
import { useAuth } from '../context/UserContext';
import { useFavourite } from '../context/FavouriteContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const Favourites = () => {
  const { user } = useAuth();
  const { favoriteIds } = useFavourite();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (!user || favoriteIds.size === 0) return;

      const favsRef = collection(db, 'favorite', user.uid, 'favorites');
      const favsSnap = await getDocs(favsRef);

      const recipes = favsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFavoriteRecipes(recipes);
    };

    fetchFavoriteRecipes();
  }, [user, favoriteIds]);

  if (!user) return <p className="text-center mt-10">Please log in to view your favorite recipes.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {favoriteRecipes.length === 0 ? (
        <p className="col-span-full text-center text-gray-600">No favorite recipes yet.</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default Favourites;
