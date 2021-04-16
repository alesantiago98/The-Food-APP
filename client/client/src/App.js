import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Recipes from './components/Recipes/Recipes';
import About from './components/About/About';
import Favorites from './components/Favorites/Favorites'
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import { Route } from 'react-router-dom';
import NewRecipe from './components/NewRecipes/NewRecipe';

function App() {
  const routes = ['/home', '/about', '/favorites', '/recipe/:recipeId', '/newRecipe']
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path={routes} component={NavBar} />
      <Route exact path={routes[0]} component={Recipes} />
      <Route path={routes[1]} component={About} />
      <Route path={routes[2]} component={Favorites} />
      <Route path={routes[3]} component={RecipeDetails} />
      <Route path={routes[4]} component={NewRecipe} />
    </div>
  );
}

export default App;
