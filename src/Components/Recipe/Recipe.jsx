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

  const fetchNutrition = async (id) => {
    const API_KEY = 'ca2a0e5a2a9247e587041a67f4033bc0';
    const url = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const nutrition = await response.json();
      return nutrition;
    } catch (error) {
      console.error('Error fetching nutrition:', error);
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
            fetchNutrition={fetchNutrition}
          />
        ))}
      </div>
    </div>
  );
};

const RecipeCard = ({ recipe, fetchNutrition }) => {
  const [nutrition, setNutrition] = useState(null);
  const [isNutritionVisible, setIsNutritionVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNutritionToggle = async () => {
    if (isNutritionVisible) {
      setIsNutritionVisible(false);
    } else {
      setLoading(true);
      const nutritionData = await fetchNutrition(recipe.id);
      setNutrition(nutritionData);
      setIsNutritionVisible(true);
      setLoading(false);
    }
  };

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <button onClick={handleNutritionToggle}>
        {isNutritionVisible ? 'Close Nutrition' : 'View Nutrition'}
      </button>
      {loading && <p>Loading nutrition data...</p>}

      {isNutritionVisible && nutrition && (
        <table className="nutrition-table">
          <caption>Nutritional Information (per serving)</caption>
          <thead>
            <tr>
              <th>Nutrient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calories</td>
              <td>{nutrition.calories}</td>
            </tr>
            <tr>
              <td>Carbs</td>
              <td>{nutrition.carbs}</td>
            </tr>
            <tr>
              <td>Fat</td>
              <td>{nutrition.fat}</td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>{nutrition.protein}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecipeSearch;
