import React, { useState } from 'react';
import './recipe.css';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const RecipeSearch = () => {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const usersignout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  const fetchRecipes = async () => {
    if (!ingredient) return;

    setLoading(true);
    const API_KEY = 'ca2a0e5a2a9247e587041a67f4033bc0';
    const baseUrl = 'https://api.spoonacular.com/recipes/findByIngredients';
    const url = `${baseUrl}?ingredients=${ingredient}&number=10&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length === 0) {
        setErrorMessage(`We don't have any recipes for "${ingredient}"`);
        setRecipes([]);
      } else {
        setErrorMessage('');
        setRecipes(data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setErrorMessage(
        'An error occurred while fetching recipes. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeDetails = async (id) => {
    const API_KEY = 'ca2a0e5a2a9247e587041a67f4033bc0';
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const details = await response.json();
      return details;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      return null;
    }
  };

  const handleSearch = async () => {
    await fetchRecipes();
  };

  if (!user) {
    return (
      <div>
        <button onClick={() => navigate('/')}>Sign back in</button>
      </div>
    );
  }

  return (
    <div className="recipe-search-container">
      <div className="navbtns">
        <button onClick={usersignout}>Sign Out</button>
        <button onClick={() => navigate('/timer')}>to Timer</button>
        <button onClick={() => navigate('/dashboard')}>to Dashboard</button>
      </div>
      <h1>Recipe Search by Ingredient</h1>
      <div>
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter ingredient"
        />
        <button onClick={handleSearch} className="searchbtn">
          Search
        </button>
      </div>
      {loading && <p>Loading recipes...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            fetchRecipeDetails={fetchRecipeDetails}
          />
        ))}
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe, fetchRecipeDetails }) => {
  const [details, setDetails] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDetailsToggle = async () => {
    if (isDetailsVisible) {
      setIsDetailsVisible(false);
    } else {
      setLoading(true);
      const detailsData = await fetchRecipeDetails(recipe.id);
      setDetails(detailsData);
      setIsDetailsVisible(true);
      setLoading(false);
    }
  };

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <button onClick={handleDetailsToggle}>
        {isDetailsVisible ? 'Close Details' : 'View Details'}
      </button>
      {loading && <p>Loading recipe details...</p>}

      {isDetailsVisible && details && (
        <div className="recipe-details">
          <h3>Ingredients</h3>
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{details.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
