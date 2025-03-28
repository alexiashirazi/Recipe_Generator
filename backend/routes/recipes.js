const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes } = require('../controllers/RecipeController');

router.post('/create', createRecipe);
router.get('/', getAllRecipes);

module.exports = router;
