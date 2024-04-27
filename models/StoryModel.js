const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  forms: [
    {
      heading: String,
      description: String,
      image: String,
      category: String
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;