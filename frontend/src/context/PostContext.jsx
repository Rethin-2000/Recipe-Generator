import React, {createContext, useState, useEffect, useContext } from 'react'
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase/config';

const postContext = createContext();

export const GetRecipiesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchRecipes = async () => {
      try {
        const q = query(collection(db, 'recipies'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedRecipes = [];

        querySnapshot.forEach((doc) => {
          fetchedRecipes.push({ id: doc.id, ...doc.data() });
        });

        setRecipes(fetchedRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipies:', error);
        setLoading(false);
      }
    }
    
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Delete recipe by id
  const deleteRecipe = async (id) => {
    try {
      await deleteDoc(doc(db, 'recipies', id));
      setRecipes((prev) => prev.filter(recipe => recipe.id !== id));
      console.log("delted");
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <postContext.Provider value={{ recipes, loading, deleteRecipe, fetchRecipes }}>
      {children}
    </postContext.Provider>
  )
}

export const usePost = () => useContext(postContext);
