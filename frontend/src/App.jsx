import React, { Suspense } from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RecipiePost from './pages/RecipiePost';
import { useAuth } from "./context/UserContext.jsx"
import ProfilePage from './pages/ProfilePage.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';
import MyRecipes from './pages/MyRecipes.jsx';
import RecipeGenerator from './pages/RecipeGenerator.jsx';
import { lazy } from 'react';

const Favourites = lazy(() => import('./pages/Favourites.jsx'));
const App = () => {
 const {isUserLoggedIn} = useAuth();
  return (
   <div className='min-h-screen m-2'>

    <Router>
      <Navbar />
     
      <Routes>
        <Route path="/" element={ isUserLoggedIn ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={ isUserLoggedIn ? <RecipiePost /> : <Login />} />
        <Route path="/profile" element={ isUserLoggedIn ? <ProfilePage /> : <Login />} />
        <Route path="/recipes/:id" element={ isUserLoggedIn ? <RecipeDetails /> : <Login />} />
        <Route path="/favorites" element={ isUserLoggedIn ? <Favourites /> : <Login />} />
        <Route path="/my-recipes" element={ isUserLoggedIn ? <MyRecipes /> : <Login />} />
        <Route path="/recipeGenerator" element={ isUserLoggedIn ? <RecipeGenerator /> : <Login />} />
      </Routes>
    </Router>

   </div>
  );
};

export default App;
