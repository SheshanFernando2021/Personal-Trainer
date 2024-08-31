import React, { useState } from 'react';

const RecipeSearch = () => {
    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchRecipes = async () => {
        if (!ingredient) return;

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
            setErrorMessage('An error occurred while fetching recipes. Please try again.');
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

    return (
        <div className="recipe-search-container">
            <h1>Recipe Search by Ingredient</h1>
            <div>
                <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    placeholder="Enter ingredient"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="recipes">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} fetchNutrition={fetchNutrition} />
                ))}
            </div>
        </div>
    );
};

const RecipeCard = ({ recipe, fetchNutrition }) => {
    const [nutrition, setNutrition] = useState(null);
    const [isNutritionVisible, setIsNutritionVisible] = useState(false);

    const handleNutritionToggle = async () => {
        if (isNutritionVisible) {
            setIsNutritionVisible(false);
        } else {
            const nutritionData = await fetchNutrition(recipe.id);
            setNutrition(nutritionData);
            setIsNutritionVisible(true);
        }
    };

    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <button onClick={handleNutritionToggle}>
                {isNutritionVisible ? 'Close Nutrition' : 'View Nutrition'}
            </button>
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
