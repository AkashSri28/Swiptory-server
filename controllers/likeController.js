const User = require('../models/UserModel');
const Story = require('../models/StoryModel');

likeStory = async (req, res) => {
   
    try {
        const { storyId } = req.body;
        const userId = req.user._id;

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the story exists
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ success: false, message: "Story not found." });
        }

        // Check if the story is already liked by the user
        const isLiked = user.likes.includes(storyId);
        if (isLiked) {
            // If the story is already liked, remove it from the user's liked stories
            const index = user.likes.indexOf(storyId);
            user.likes.splice(index, 1);
            await user.save();

            // Decrement the like count of the story
            if (story.likes > 0) {
                story.likes--;
                await story.save();
            }

            return res.status(200).json({ success: true, message: "Story disliked successfully." });
        } else {
            // Add the story to the user's liked stories
            user.likes.push(storyId);
            await user.save();

            // Increment the like count of the story
            story.likes++;
            await story.save();

            return res.status(200).json({ success: true, message: "Story liked successfully." });
        }
    } catch (error) {
        console.error('Error liking/ disliking story:', error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

const checkLike = async (req, res)=>{
    try {
        const userId = req.user._id; // Current user's ID
        const storyId = req.params.storyId; // Story ID

        // Check if the story is liked by the current user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isLiked = user.likes.includes(storyId);
        res.json({ isLiked });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {likeStory, checkLike};