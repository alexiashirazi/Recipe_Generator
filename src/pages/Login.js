import React, { useState } from 'react';
import '../assets/styles/Login.css';
import { useNavigate } from 'react-router-dom'; // For redirection
import axios from 'axios'; // Import Axios

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset error messages

    try {
      console.log('Submitting form data:', formData); // Debugging log
      const response = await axios.post('http://localhost:3000/users/login', formData);

      // If login is successful, store the token and redirect
      if (response.status === 200) {
        console.log('Login successful! Token:', response.data.token); // Debugging log
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (err) {
      console.error('Error during login:', err); // Debugging log
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Eroare de rețea');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Autentificare</h1>
        <p>Conectează-te pentru a accesa rețetele personalizate!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Introduceți email-ul"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Parolă:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Introduceți parola"
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div> // Loader during submission
            ) : (
              "Conectare"
            )}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="register-link">
          Nu ai cont? <a href="/register">Creează un cont aici!</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
