import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import '../assets/styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    diet: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();  // Initialize navigate hook

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Parolele nu coincid!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        name: formData.username,  // Ensure correct field names as expected by backend
        email: formData.email,
        password: formData.password,
        dietary_preferences: formData.diet,
      });

      setMessage('Înregistrare reușită! Redirecționare către autentificare...');
      
      setTimeout(() => {
        navigate('/login');  // Redirect to login after successful registration
      }, 2000);  // 2-second delay to show success message

    } catch (error) {
      setMessage('Eroare la înregistrare. Te rugăm să încerci din nou.');
      console.error('Registration error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <h1>Înregistrare</h1>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nume utilizator:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Parolă:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirmare parolă:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Preferințe dietetice:</label>
            <select name="diet" value={formData.diet} onChange={handleChange}>
              <option value="">Selectați...</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Fără Gluten</option>
              <option value="None">Niciuna</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Se procesează...' : 'Creează cont'}
          </button>
        </form>
      </header>
    </div>
  );
}

export default Register;
