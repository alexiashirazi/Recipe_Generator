import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import RecipesPage from "./pages/RecipesPage";
import Dashboard from "./pages/Dashboard";
import RecipeForm from "./pages/RecipeForm";
import History from "./pages/RecipesPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/recipe" element={<RecipeForm />} />


      </Routes>
    </Router>
  );
}

export default App;
