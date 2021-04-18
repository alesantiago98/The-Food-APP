import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Recipes from './components/Recipes/Recipes';
import About from './components/About/About';
import Favorites from './components/Favorites/Favorites'
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import NewRecipe from './components/NewRecipes/NewRecipe';
import Login from './components/Login/Login';
import { Route } from 'react-router-dom';

function App() {
  const routes = ['/home', '/about', '/favorites', '/recipe/:recipeId', '/newRecipe', '/login']
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path={routes} component={NavBar} />
      <Route exact path={routes[0]} component={Recipes} />
      <Route path={routes[1]} component={About} />
      <Route path={routes[2]} component={Favorites} />
      <Route path={routes[3]} component={RecipeDetails} />
      <Route path={routes[4]} component={NewRecipe} />
      <Route path={routes[5]} component={Login} />
    </div>
  );
}

export default App;
