import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="home-navbar">
      <div className="navbar-logo">RecipeHub</div>
      <div className="navbar-links">
        <button className="nav-button" onClick={() => navigate('/history')}>History</button>
        <button className="nav-button" onClick={() => navigate('/recipe')}>Generate Recipe</button>
        <button className="nav-button" onClick={() => navigate('/')}>Log Out</button>
      </div>
    </nav>
  );
}

export default Navbar;
