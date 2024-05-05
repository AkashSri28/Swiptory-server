const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { bookmarkStory, getBookmarkedStories, checkBookmark } = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// API endpoint to bookmark a story for a user
router.post('/bookmark', authMiddleware, bookmarkStory);

//fetch bookmarked stories for user
router.get('/bookmarkedStories', authMiddleware, getBookmarkedStories)

//check if story is bookmarked by current user
router.get('/checkBookmark/:storyId', authMiddleware, checkBookmark)

module.exports = router;