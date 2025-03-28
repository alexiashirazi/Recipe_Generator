const History = require('../models/History');

exports.addHistoryEntry = async (req, res) => {
    const { user_id, recipe_id } = req.body;

    // Log pentru debugging
    console.log('Request received:');
    console.log('user_id:', user_id);
    console.log('recipe_id:', recipe_id);

    try {
        const historyEntry = new History({ user_id, recipe_id });
        await historyEntry.save();
        res.status(201).json(historyEntry);
    } catch (error) {
        console.error('Error saving history entry:', error.message);
        res.status(500).json({ message: 'Error adding history entry', error: error.message });
    }
};


exports.getUserHistory = async (req, res) => {
    try {
        const history = await History.find({ user_id: req.params.userId })
            .populate('recipe_id', 'title')
            .populate('user_id', 'name');
        res.status(200).json(history);
        console.log('Requested user ID:', req.params.userId);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching history' });
    }
};
