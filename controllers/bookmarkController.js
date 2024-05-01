const User = require('../models/UserModel');
const Story = require('../models/StoryModel');

bookmarkStory = async (req, res) => {
   
    try {
        const { storyId } = req.params;
        const userId = req.user._id;

        console.log(req);
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

module.exports = {bookmarkStory};