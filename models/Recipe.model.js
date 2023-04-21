const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  cookingTime: {
    type: Number,
    default: 30,
  },
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
