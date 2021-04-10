const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
  const { name } = req.query;
  if(name) {
    const apiRecipes = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${name}`)
    const dbRecipes = Recipe.findAll({ where: { 
      name: {
        [Op.like]: `%${req.query.name}`
      }
    }, limit: 9})
    Promise.all([apiRecipes, dbRecipes])
    .then(r => {
      let [apiResponse, dbResponse] = r;
      const response = dbResponse.concat(apiResponse.data.results)
      res.send(response)
    })
    .catch(err => console.error(err));
  }
  else {
    const apiRecipes = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
    const dbRecipes = Recipe.findAll()
    Promise.all([apiRecipes, dbRecipes])
    .then(r => {
      let [apiResponse, dbResponse] = r;
      const response = dbResponse.concat(apiResponse.data.results)
      res.send(response)
    })
    .catch(err => console.error(err));
  }
});

router.get('/:recipeId', (req, res) => {
  Recipe.findByPk(req.params.recipeId, { include: Diet })
  .then(data => res.send(data))
});

router.post('/', (req, res) => {
  const {name, summary, score, healthyFoodLevel, stepByStep, diets} = req.body
  const id = uuidv4();
  const newRecipe = {id, name, summary, score,healthyFoodLevel, stepByStep};
  const recipe = Recipe.create({...newRecipe})
  recipe.setDiets(diets)
  res.send(recipe)
})

module.exports = router;