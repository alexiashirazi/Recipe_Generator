const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favorite_count: { type: Number, default: 0 },
});

module.exports = mongoose.model('Recipe', RecipeSchema);

// const mongoose = require('mongoose');

// const RecipeSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // Titlul rețetei
//   image: { type: String }, // URL-ul imaginii rețetei (venit din Spoonacular)
//   ingredients: { type: [String], required: false }, // Lista ingredientelor (dacă le primești explicit)
//   instructions: { type: String, required: false }, // Instrucțiuni (opțional, Spoonacular nu le furnizează întotdeauna)
//   created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Utilizatorul care a creat rețeta (pentru rețete salvate manual)
//   favorite_count: { type: Number, default: 0 }, // Număr de utilizatori care au salvat ca "favorite"
//   usedIngredients: { type: Number, default: 0 }, // Numărul de ingrediente folosite (din Spoonacular)
//   missedIngredients: { type: Number, default: 0 }, // Numărul de ingrediente lipsă (din Spoonacular)
//   spoonacular_id: { type: Number, unique: true, sparse: true }, // ID unic de la Spoonacular (pentru a evita duplicatele)
// });

module.exports = mongoose.model('Recipe', RecipeSchema);
