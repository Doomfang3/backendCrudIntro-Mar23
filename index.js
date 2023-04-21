const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Recipe = require('./models/Recipe.model')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.get('/', (request, response) => {
  response.render('home')
})

// GET Route to get all recipes
app.get('/recipes', async (request, response) => {
  try {
    const allRecipes = await Recipe.find()
    console.log(allRecipes)

    response.render('recipe/all', { allRecipes })
  } catch (error) {
    console.log(error)
  }
})

// GET Route to create one recipe
app.get('/recipes/new', (request, response) => {
  console.log(request.query)

  response.render('recipe/new')
})

// GET Route to get one recipe
app.get('/recipes/:recipeId', async (request, response) => {
  console.log(request.params)
  const { recipeId } = request.params

  try {
    const recipe = await Recipe.findById(recipeId)

    response.render('recipe/one', recipe)
  } catch (error) {
    console.log(error)
  }
})

// POST Route to create one recipe
app.post('/recipes/new', async (request, response) => {
  console.log(request.body)
  const newRecipe = await Recipe.create({
    ...request.body,
    ingredients: request.body.ingredients.split(' '),
  })
  response.redirect(`/recipes/${newRecipe._id}`)
})

mongoose
  .connect('mongodb://localhost:27017/backendCrudIntro')
  .then(salad => {
    console.log(`Connected to Mongo! Database name: "${salad.connections[0].name}"`)

    app.listen(3000, () => {
      console.log('Server running on 3000')
    })
  })
  .catch(err => console.error('Error connecting to mongo', err))
