import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage or authentication token
    localStorage.removeItem('authToken');
    navigate('/home');  // Redirect to login after logout
  }, [navigate]);

  return (
    <div>
      <h1>Te-ai deconectat cu succes</h1>
      <p>Redirecționare către pagina de home...</p>
    </div>
  );
}

export default Logout;
