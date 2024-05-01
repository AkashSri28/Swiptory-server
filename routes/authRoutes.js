const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { bookmarkStory } = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// API endpoint to bookmark a story for a user
router.post('/bookmark', authMiddleware, bookmarkStory);

module.exports = router;