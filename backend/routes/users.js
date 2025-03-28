const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/UserController');


// Ruta pentru înregistrare utilizator
router.post('/register', registerUser);

// Ruta pentru autentificare utilizator
router.post('/login', loginUser);

module.exports = router;
