const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
    const { title, ingredients, instructions, created_by } = req.body;
    try {
        const newRecipe = new Recipe({ title, ingredients, instructions, created_by });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe' });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('created_by', 'name email');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes' });
    }
};
