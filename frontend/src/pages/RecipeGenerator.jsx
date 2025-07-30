import React, { useState } from 'react';
import axios from 'axios';

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const res = await axios.post('http://localhost:5000/api/ai/generate', {
        ingredients: ingredients.split(',').map(i => i.trim()),
      });

      setRecipe(res.data);
      console.log(res); // already parsed from backend
    } catch (err) {
      console.error('Error generating recipe:', err);
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center">AI Recipe Generator 🍳</h2>

      <input
        type="text"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        placeholder="e.g., chicken, tomato, onion"
        className="border p-2 w-full rounded mb-2"
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Recipe'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {recipe && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-2xl font-bold mb-2">{recipe.title}</h3>

          <h4 className="text-lg font-semibold mt-4">Ingredients</h4>
          <ul className="list-disc ml-6 mb-4">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold">Preparation Steps</h4>
          <ul className="list-none ml-6 space-y-2">
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeGenerator;
