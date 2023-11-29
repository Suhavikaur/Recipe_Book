const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Recipe model
const Recipe = mongoose.model('Recipe', {
  name: String,
  ingredients: [String],
  method: String,
});

// Middleware
app.use(bodyParser.json());

// Serve the HTML, CSS, and JS files
app.use(express.static('public'));

// API routes
app.post('/api/recipes', async (req, res) => {
  try {
    const { name, ingredients, method } = req.body;
    const recipe = new Recipe({ name, ingredients, method });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
