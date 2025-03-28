const express = require('express');
const connectDB = require('./config/db'); // Importă conexiunea la baza de date
const cors = require('cors');

require('dotenv').config();
connectDB(); // Conectează-te la baza de date

const app = express();
app.use(cors({
  origin: 'http://localhost:5000',  // Change this to allow specific origins
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json()); // Middleware pentru a permite procesarea JSON

// Importă ruta pentru utilizatori
const userRoutes = require('./routes/users');
app.use('/users', userRoutes); 

const ingredientRoutes= require('./routes/ingredient');
app.use('/ingredients', ingredientRoutes);


const recipeRoutes = require('./routes/recipes');
app.use('/recipes', recipeRoutes);

const historyRoutes=require('./routes/history');
app.use('/history',historyRoutes);

// Endpoint de test
app.get('/', (req, res) => {
  res.send('API is running');
});

// Pornirea serverului
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
