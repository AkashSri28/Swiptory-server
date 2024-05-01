// routes/storyRoutes.js
const express = require('express');
const router = express.Router();
const {addStory, getUserStories, getStoriesByCategory, editStory} = require('../controllers/storyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware ,addStory);

// Get user stories
router.get('/user', authMiddleware, getUserStories);

// Get stories by category
router.get('/category/:category', getStoriesByCategory);

// Route to update a story
router.post('/edit', authMiddleware, editStory);

module.exports = router;