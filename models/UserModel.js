const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story' // Referencing the Story model
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story' // Referencing the Story model
  }],
  profilePic: {
    type: String,
    default: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;