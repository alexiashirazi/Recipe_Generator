import React, { useState, useEffect } from "react";
import "../assets/styles/RecipesPage.css";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]); // Stocăm rețetele în state
  const [loading, setLoading] = useState(true); // Pentru afișarea unui loader
  const [error, setError] = useState(null); // Pentru a gestiona erorile

  // Fetch rețete din API (simulăm o cerere aici)
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipes"); // Înlocuiește cu URL-ul API-ului tău
        if (!response.ok) {
          throw new Error("Eroare la încărcarea rețetelor");
        }
        const data = await response.json();
        setRecipes(data); // Setează rețetele în state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Oprim loader-ul
      }
    };

    fetchRecipes();
  }, []); // useEffect rulează o singură dată la montare

  // Afișare loading sau eroare
  if (loading) {
    return <div className="recipes-container">Se încarcă rețetele...</div>;
  }

  if (error) {
    return <div className="recipes-container">Eroare: {error}</div>;
  }

  return (
    <div className="recipes-container">
      <header className="recipes-header">
        <h1>Rețetele tale</h1>
        <p>Explorează rețetele generate pe baza ingredientelor introduse!</p>
      </header>
      <div className="recipes-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <button className="view-button">Vezi detalii</button>
            </div>
          ))
        ) : (
          <p>Nu există rețete disponibile momentan.</p>
        )}
      </div>
    </div>
  );
}

export default RecipesPage;
