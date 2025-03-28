const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

// Înregistrarea unui nou utilizator
exports.registerUser = async (req, res) => {
  const { name, email, password, dietary_preferences } = req.body;

  try {
    // Verifică dacă utilizatorul există deja
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email-ul este deja folosit' });
    }

    // Hash parola utilizatorului înainte de a salva
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      dietary_preferences
    });

    await user.save();
    res.status(201).json({ message: 'Utilizator înregistrat cu succes' });

  } catch (error) {
    res.status(500).json({ message: 'Eroare la înregistrare' });
  }
};

// Autentificarea utilizatorului
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifică dacă utilizatorul există
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email sau parolă incorectă' });
    }

    // Compară parola introdusă cu cea hash-ată în baza de date
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email sau parolă incorectă' });
    }

    // Generează token de autentificare
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Autentificare reușită', token });

  } catch (error) {
    res.status(500).json({ message: 'Eroare la autentificare' });
  }
}