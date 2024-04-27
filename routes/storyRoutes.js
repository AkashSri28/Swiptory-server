// routes/storyRoutes.js
const express = require('express');
const router = express.Router();
const {addStory, getUserStories} = require('../controllers/storyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware ,addStory);

// Get user stories
router.get('/user', authMiddleware, getUserStories);

module.exports = router;