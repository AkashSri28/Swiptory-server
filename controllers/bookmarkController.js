const User = require('../models/UserModel');
const Story = require('../models/StoryModel');

const bookmarkStory = async (req, res) => {
   
    try {
        const { storyId } = req.body;
        const userId = req.user._id;

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the story is already bookmarked by the user
        const storyIndex = user.bookmarks.indexOf(storyId);
        if (storyIndex !== -1) {
            // If the story is already bookmarked, remove it from bookmarks
            user.bookmarks.splice(storyIndex, 1);
            await user.save();
            return res.status(200).json({ success: true, message: "Story removed from bookmarks." });
        }

         // Find the story
         const story = await Story.findById(storyId);
         if (!story) {
             return res.status(404).json({ success: false, message: "Story not found." });
         }
 

        // Bookmark the story for the user
        user.bookmarks.push(storyId);
        await user.save();

        return res.status(200).json({ success: true, message: "Story bookmarked successfully." });
    } catch (error) {
        console.error('Error bookmarking story:', error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const getBookmarkedStories = async(req, res) => {
    try {
        const userId = req.user._id;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

         // Retrieve bookmarked story IDs from user's bookmarks
         const bookmarkedStoryIds = user.bookmarks;

         // Find bookmarked stories in the Story collection based on the IDs
         const bookmarkedStories = await Story.find({ _id: { $in: bookmarkedStoryIds } });
 
         return res.status(200).json({ success: true, bookmarks: bookmarkedStories });

    } catch (error) {
        console.error('Error fetching bookmarked stories:', error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

const checkBookmark = async (req, res)=>{
    try {
        const userId = req.user._id; // Current user's ID
        const storyId = req.params.storyId; // Story ID

        // Check if the story is bookmarked by the current user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isBookmarked = user.bookmarks.includes(storyId);
        res.json({ isBookmarked });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {bookmarkStory, getBookmarkedStories, checkBookmark};