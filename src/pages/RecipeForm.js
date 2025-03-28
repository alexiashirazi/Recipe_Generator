import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/RecipeForm.css'; // Import the new CSS file
import Navbar from './Navbar';


function RecipeForm() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formattedIngredients = ingredients
      .split(',')
      .map((ingredient) => ingredient.trim())
      .join(',');

    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
          ingredients: formattedIngredients,
          number: 2,
          apiKey: 'APIKEY',
        },
      });

      setRecipes(response.data);
    } catch (error) {
      console.error('Error generating recipes:', error);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="recipe-form-container">
      <h2 className="title">Discover Recipes Based on Ingredients</h2>
      <form onSubmit={handleSubmit} className="recipe-form">
        <textarea
          className="ingredients-input"
          placeholder="e.g., tomato, basil, garlic"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Recipes'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {recipes.length > 0 && (
        <div className="recipes-container">
          <h3>Generated Recipes</h3>
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <h4 className="recipe-title">{recipe.title}</h4>
                <p><strong>Used Ingredients:</strong> {recipe.usedIngredientCount}</p>
                <p><strong>Missed Ingredients:</strong> {recipe.missedIngredientCount}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeForm;
