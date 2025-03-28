import React from 'react';
import RecipeForm from './RecipeForm';
import Navbar from './Navbar';
import avocadoImage from '../assets/images/styles/avocado.jpeg';
import salmonImage from '../assets/images/styles/salmon.jpeg';
import smoothieImage from '../assets/images/styles/smoothie.jpeg';
import { useNavigate } from 'react-router-dom';



function Dashboard() {
  const navigate = useNavigate();

  const recipes = [
    {
      title: "Avocado Toast",
      description: "A delicious and healthy breakfast with creamy avocado and crispy toast.",
      image: avocadoImage,
    },
    {
      title: "Vegan Smoothie",
      description: "A refreshing and nutritious smoothie packed with fruits and nutrients.",
      image: smoothieImage,
    },
    {
      title: "Grilled Salmon",
      description: "Perfectly grilled salmon with a touch of lemon and fresh herbs.",
      image: salmonImage,
    }
  ];

  return (
    <div className="home-container">
      {/* Include Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <header className="home-header">
        <h1>Generator de <span>Rețete Inteligent</span></h1>
        <p>Găsește rețete bazate pe ingredientele pe care le ai deja acasă!</p>
      </header>

      {/* Recipe Articles Section */}
      <section className="recipe-section">
        <h2>Rețete Recomandate</h2>
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;