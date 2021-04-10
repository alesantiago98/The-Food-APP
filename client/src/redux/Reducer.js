const initialState = {
  allRecipes: [],
  searchedRecipes: [],
  recipeDetail: {},
  favoriteRecipes: []
}

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case 'ALL_RECIPES':
      return {
        ...state,
        allRecipes: state.allRecipes.concat(action.payload)
      }
    case 'SEARCH_RECIPES':
      return {
        ...state,
        searchedRecipes: state.searchedRecipes.concat(action.payload)
      }
    case 'SEARCH_RECIPE_DETAIL':
      return {
        ...state,
        recipeDetail: action.payload
      }
    case 'ADD_RECIPE_TO_FAVORITES':
      return {
        ...state,
        favoriteRecipes: state.favoriteRecipes.concat(action.payload)
      }
    case 'REMOVE_RECIPE_FROM_FAVORITES':
      return {
        ...state,
        favoriteRecipes: state.favoriteRecipes.filter(recipe => recipe.id !== action.payload)
      }
    default:
      return state;
  };
};