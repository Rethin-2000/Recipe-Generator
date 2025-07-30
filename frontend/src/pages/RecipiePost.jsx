import React, { useState,  } from 'react';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import {usePost} from '../context/PostContext';
import {
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

const PostRecipeForm = () => {
  const {user} = useAuth();
  const {fetchRecipes} = usePost();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !ingredients.trim() ||
      !instructions.trim() ||
      !image.trim()
    ) {
      alert('Please fill in all the fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'recipies'), {
        title: title.trim(),
        isVeg,
        ingredients: ingredients.trim().split('\n').filter(i => i.trim() !== ""),
        steps: instructions.trim().split('\n').filter(s => s.trim() !== ""),
        image: image.trim(),
        createdAt: serverTimestamp(),
        userId: user.uid,
      });
      
      fetchRecipes();
      alert('Recipe posted successfully!');
      //e.target.reset(); // Clear form
     // Optionally reset state
      setTitle('');
      setIsVeg(true);
      setIngredients('');
      setInstructions('');
      setImage('');

      navigate('/');

    } catch (error) {
      console.error('Error posting recipe:', error);
      alert('Failed to post recipe.');
    }
  };

  return (
    <div className="w-full bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl p-6 sm:p-8 bg-white rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-[#FF6347] mb-8 text-center">
          Post a New Recipe
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipe Title */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">Recipe Title</label>
            <input
              type="text"
              placeholder="e.g. Masala Dosa"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#FF6347] focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Veg / Non-Veg */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">Type</label>
            <div className="flex gap-8 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  className="accent-[#FF6347] h-5 w-5"
                  checked={isVeg}
                  onChange={() => setIsVeg(true)}
                />
                <span>Veg</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  className="accent-[#FF6347] h-5 w-5"
                  checked={!isVeg}
                  onChange={() => setIsVeg(false)}
                />
                <span>Non-Veg</span>
              </label>
            </div>
          </div>

          {/* Ingredients */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">Ingredients</label>
            <textarea
              rows="4"
              placeholder="Write ingredients line by line"
              className="w-full resize-y px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#FF6347] focus:outline-none"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </div>

          {/* Steps */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">Instructions</label>
            <textarea
              rows="4"
              placeholder="Step-by-step preparation instructions"
              className="w-full resize-y px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#FF6347] focus:outline-none"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              type="text"
              placeholder="Paste image URL (e.g. from Unsplash or Firebase)"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#FF6347] focus:outline-none"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-[#FF6347] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#e0543d] transition duration-200 transform hover:scale-105"
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostRecipeForm;
