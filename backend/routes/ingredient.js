const express = require('express');
const router = express.Router();
const { addIngredient, getIngredients } = require('../controllers/IngredientController');

router.post('/add', addIngredient);
router.get('/', getIngredients);

module.exports = router;
