// controllers/storyController.js
const Story = require('../models/StoryModel');

// Add story
const addStory = async (req, res) => {
  try {
    const storyForms = req.body.storyForms;
    const user = req.user;
    // Create a new story object
    const newStory = new Story({
      forms: storyForms,
      user: user._id
    });
    console.log(newStory)
    // Save the story to the database
    await newStory.save();
    res.status(201).json({ message: 'Story added successfully' });
  } catch (error) {
    console.error('Error adding story:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get stories by user
const getUserStories = async (req, res) => {
    try {
      const user = req.user; // Get user from authentication middleware
      const stories = await Story.find({ user: user._id });
      console.log(stories)
      res.status(200).json({ stories });
    } catch (error) {
      console.error('Error fetching user stories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { addStory, getUserStories };
