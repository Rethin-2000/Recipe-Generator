import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/UserContext';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import RecipeCard from '../components/RecipieCard';

const MyRecipes = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
   


   useEffect(() => {
    if (!user) return;

    const fetchRecipes = async () => {
         setLoading(true);
        try {
            const q = query(collection(db, 'recipies'), where('userId', '==', user.uid));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchRecipes();
}, [user]);


    if (!user) {
        return <p className="text-center mt-10">Please log in to view your favorite recipes.</p>;
    }

    if (loading) {
        return <p className="text-center mt-10">Loading your recipes...</p>;
    }
                
     console.log("my",recipes)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            
            {recipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                
                recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))
            )}
        </div>
    );
};

export default MyRecipes;
