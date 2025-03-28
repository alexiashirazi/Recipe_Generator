const express = require('express');
const router = express.Router();
const { addHistoryEntry, getUserHistory } = require('../controllers/HistoryController');

router.post('/add', addHistoryEntry);
router.get('/user/:userId', getUserHistory);

module.exports = router;
