const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', HistorySchema);
