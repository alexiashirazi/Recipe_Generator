const Ingredient = require('../models/Ingredient');

exports.addIngredient = async (req, res) => {
    const { name, type, created_by } = req.body;
    try {
        const ingredient = new Ingredient({ name, type, created_by });
        await ingredient.save();
        res.status(201).json(ingredient);
    } catch (error) {
        res.status(500).json({ message: 'Error adding ingredient' });
    }
};

exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find().populate('created_by', 'name');
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ingredients' });
    }
};
