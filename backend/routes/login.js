const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importă modelul User
const jwt = require('jsonwebtoken');

// Endpoint pentru autentificare
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificăm dacă utilizatorul există
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email sau parolă incorectă' });
    }

    // Comparăm parola utilizatorului
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email sau parolă incorectă' });
    }

    // Generăm un token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token-ul este valabil 1 oră
    });

    // Trimitem token-ul către client
    res.status(200).json({ message: 'Autentificare reușită', token });
  } catch (err) {
    console.error('Eroare de autentificare:', err.message);
    res.status(500).json({ message: 'Eroare de server' });
  }
});

module.exports = router;
