
// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');

// Create Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(cors(
  {
    origin: ["https://swiptory-client-tau.vercel.app", "http://localhost:3000"],
    methods:["POST", "GET", "PUT"],
    credentials: true
  }
));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
    // Listen for requests
    app.listen(process.env.PORT, () => {
    console.log(`Connected to DB, Sever is running on port ${process.env.PORT}`);
    console.log(process.env.PORT);
  });
})
.catch((error)=>{
    console.log(error)
})


// Routes
app.use('/api/user', authRoutes);
app.use('/api/story', storyRoutes);