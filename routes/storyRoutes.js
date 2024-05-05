// routes/storyRoutes.js
const express = require('express');
const router = express.Router();
const {addStory, getUserStories, getStoriesByCategory, editStory, getStory} = require('../controllers/storyController');
const authMiddleware = require('../middleware/authMiddleware');
const { likeStory, checkLike } = require('../controllers/likeController');

router.post('/add', authMiddleware ,addStory);

// Get user stories
router.get('/user', authMiddleware, getUserStories);

// Get stories by category
router.get('/category/:category', getStoriesByCategory);

// Route to update a story
router.post('/edit', authMiddleware, editStory);

//Route to like a story
router.post('/like', authMiddleware, likeStory)

//Route to check if the story is like by user
router.get('/checkLike/:storyId', authMiddleware, checkLike)

//Route to get a story
router.get('/:id', getStory)

module.exports = router;