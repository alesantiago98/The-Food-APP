import React from 'react';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Recipes from './components/Recipes/Recipes';
import About from './components/About/About';
import Favorites from './components/Favorites/Favorites'
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path='/' component={LandingPage} />
      <Route path='/home' component={NavBar} />
      <Route exact path='/home' component={Recipes}/>
      <Route path='/about' component={About} />
      <Route path='/favorites' component={Favorites}/>
      <Route path='/recipe/:recipeId' component={RecipeDetails}/>
    </div>
  );
}

export default App;
