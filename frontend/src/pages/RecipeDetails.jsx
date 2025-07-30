import React from 'react';
import { useParams } from 'react-router-dom';
import { usePost } from '../context/PostContext';

const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes } = usePost();

  const recipe = recipes.find((r) => r.id === (id));
  // console.log(recipe);

    if (!recipe) {
    return <p className="text-center text-lg text-gray-700 py-10">Loading recipe...</p>;
  }

  console.log("recipe details",recipes);
  return (
    <div className="min-h-screen bg-gray-100 text-white py-10 px-4 md:px-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl text-black overflow-hidden">
        {/* Recipe Image */}
        <img
          src={recipe.image}
          alt="Recipe"
          className="w-full h-64 object-cover"
        />

        {/* Details */}
        <div className="p-6">
          {/* Title and Tags */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-3xl font-bold text-[#FF6347]">{recipe.title}</h1>
            <span className="mt-2 md:mt-0 inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {recipe.veg ? 'Veg' : 'Non-Veg'}
            </span>
          </div>

          {/* Author + Time */}
          {/* <div className="text-gray-600 mb-6 text-sm">
            <p>Posted by <span className="font-medium">Chef Alex</span> • 20 mins cook time</p>
          </div> */}

          {/* Ingredients */}
          <h2 className="text-xl font-semibold mb-2 text-[#FF6347]">Ingredients</h2>
          <ul className="list-disc list-inside mb-6 space-y-1 text-gray-700">
            {recipe.ingredients
            ?.filter(ingredient => ingredient.trim()!== "").map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          {/* Steps */}
          <h2 className="text-xl font-semibold mb-2 text-[#FF6347]">Preparation Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {recipe.steps
            ?.filter(step => step.trim() !== "")
            .map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
            

          {/* Optional Notes */}
          {/* <div className="mt-6 bg-[#FF6347] text-white p-4 rounded-xl">
            <p className="text-sm italic">Note: You can add cheese or herbs for extra flavor!</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
