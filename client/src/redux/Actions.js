import axios from 'axios';

//Actions

export function getRecipes() {
  return function (dispatch) {
    axios.get(`http://localhost:3001/recipe`)
      .then(res => dispatch({
        type: 'ALL_RECIPES',
        payload: res.data
      })
      ).catch(err => {
        console.error(err)
      });
  };
};

export function searchRecipes(recipe) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/recipe?name=${recipe}`)
      .then(res => dispatch({
        type: 'SEARCH_RECIPES',
        payload: res.data
      })
      ).catch(err => {
        console.error(err)
      });
  };
};

export function searchRecipeDetail(recipeId) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/recipe/${recipeId}`)
      .then(res => dispatch({
        type: 'SEARCH_RECIPE_DETAIL',
        payload: res.data
      })
      ).catch(err => {
        console.error(err)
      });
  };
};

export function addToFavorites(recipe) {
  return {
    type: 'ADD_RECIPE_TO_FAVORITES',
    payload: recipe
  };
};

export function removeFromFavorites(recipe) {
  return {
    type: 'REMOVE_RECIPE_FROM_FAVORITES',
    payload: recipe
  };
};