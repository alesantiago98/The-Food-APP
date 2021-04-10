const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
  //Imagen, Nombre, Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
  let { name, page } = req.query;
  page ? page : page = 1;
  const offset = (page - 1) * 9;
  const limit = page * 9;
  if (name) {
    const apiRecipes = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${name}`)
    const dbRecipes = Recipe.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })
    Promise.all([apiRecipes, dbRecipes])
      .then(r => {
        const [apiResponse, dbResponse] = r;
        if (apiResponse.data.results.length !== 0 || dbResponse.length !== 0) {
          const response = dbResponse.concat(apiResponse.data.results)
          const ultimateRecipes = response.map(r => (
            {
              id: r.id,
              img: r.image,
              name: r.name,
              diet: r.diets
            }))
          res.send(ultimateRecipes.slice(offset, limit))
        } else {
          res.send({ msg: 'Could not find any recipe for that name' })
        }
      })
      .catch(err => console.error(err));
  }
  else {
    const apiRecipes = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const dbRecipes = Recipe.findAll()
    Promise.all([apiRecipes, dbRecipes])
      .then(r => {
        let [apiResponse, dbResponse] = r;
        const response = dbResponse.concat(apiResponse.data.results)
        const ultimateRecipes = response.map(r => ({
          id: r.id,
          img: r.image,
          name: r.title,
          diet: r.diets
        })).slice(offset, limit)
        res.send(ultimateRecipes)
      })
      .catch(err => console.error(err));
  }
});

router.get('/:recipeId', (req, res) => {
  //Los campos mostrados en la ruta principal para cada receta
  //Resumen del plato
  //Puntuación
  //Nivel de "comida saludable"
  //Paso a paso
  const { recipeId } = req.params;
  let pattern = /^[0-9]+$/;
  if (pattern.test(recipeId)) {
    axios.get(`https://api.spoonacular.com/recipes/${parseInt(recipeId)}/information?apiKey=${API_KEY}`)
      .then(response => {
        const ultimateRecipe =
        {
          id: response.data.id,
          img: response.data.image,
          name: response.data.name,
          diet: response.data.diets,
          summary: response.data.summary,
          healthyFoodLevel: response.data.healthScore,
          score: response.data.spoonacularScore,
          stepByStep: response.data.instructions
        }
        res.send(ultimateRecipe)
      })
      .catch(err => console.error(err));
  } else {
    Recipe.findByPk(recipeId, { include: Diet })
      .then(data => res.send(data))
      .catch(err => console.error(err));
  }
});

router.post('/', async (req, res) => {
  const { name, summary, score, healthyFoodLevel, stepByStep, diets } = req.body;
  const id = uuidv4();
  const newRecipe = { id, name, summary, score, healthyFoodLevel, stepByStep };
  const recipe = await Recipe.create(newRecipe);
  recipe.setDiets(diets);
  res.send(recipe);
});

module.exports = router;