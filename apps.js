const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Comment model
const Comment = mongoose.model('Comment', {
  author: String,
  text: String,
});

// Middleware
app.use(bodyParser.json());

// Serve the HTML, CSS, and JS files
app.use(express.static('public'));

// API routes
app.post('/api/comments', async (req, res) => {
  try {
    const { author, text } = req.body;
    const comment = new Comment({ author, text });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
