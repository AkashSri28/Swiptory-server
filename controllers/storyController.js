// controllers/storyController.js
const Story = require('../models/StoryModel');

// Add story
const addStory = async (req, res) => {
  try {
    const storyForms = req.body.storyForms;
    const category = req.body.category;
    const user = req.user;
    // Create a new story object
    const newStory = new Story({
      forms: storyForms,
      category: category,
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

  // Get stories by category
const getStoriesByCategory = async (req, res) => {
    try {
      const category = req.params.category;
    //   const stories = await Story.find({ 'forms.category': category });
        let stories;
        if (category === 'All') {
            stories = await Story.find();
        } else {
            stories = await Story.find({ 'category': category });
        }
      res.status(200).json(stories);
    } catch (error) {
      console.error('Error fetching stories by category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Update a story
const editStory = async (req, res) => {
  try {
    const { storyForms, storyId, category } = req.body;
    // Find the story by ID and update
    const updatedStory = await Story.findOneAndUpdate(
      { _id: storyId },
      { $set: { forms: storyForms, category } }, // Update the forms and category with new data
      { new: true }
    );
    res.status(200).json({ message: 'Story updated successfully' });
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Get a story by Id
const getStory = async (req, res) => {
  const sotryId = req.params.id;
  console.log(storyId)
  try {
    // Find the story by ID in the database
    const story = await Story.findById(storyId);
    console.log(story)

    if (!story) {
        return res.status(404).json({ error: 'Story not found' });
    }

    res.json(story);
  } catch (error) {
      console.error('Error fetching story:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { addStory, getUserStories, getStoriesByCategory, editStory, getStory };
