import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './UserContext';

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setFavoriteIds(new Set());
        return;
      }

      const favColRef = collection(db, 'favorite', user.uid, 'favorites');
      const snapshot = await getDocs(favColRef);
      const ids = new Set(snapshot.docs.map((doc) => doc.id));
      setFavoriteIds(ids);
    };

    loadFavorites();
  }, [user]);

  const isFavorited = (recipeId) => favoriteIds.has(recipeId);

  const toggleFavorite = async (recipe) => {
    if (!user) {
      alert('Please log in to use favorites');
      return;
    }

    const favRef = doc(db, 'favorite', user.uid, 'favorites', recipe.id);

    if (favoriteIds.has(recipe.id)) {
      await deleteDoc(favRef);
      setFavoriteIds((prev) => {
        const updated = new Set(prev);
        updated.delete(recipe.id);
        return updated;
      });
    } else {
      await setDoc(favRef, { ...recipe, addedAt: new Date() });
      setFavoriteIds((prev) => new Set(prev).add(recipe.id));
    }
  };

  return (
    <FavouriteContext.Provider value={{ isFavorited, toggleFavorite, favoriteIds }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
