import React from 'react';
import { connect } from 'react-redux';
import './RecipeDetails.css';

function RecipeDetails({ recipe }) {

  return (
    <div className='details'>
      {console.log(recipe)}
      <div className='info'> 
      <h2>{recipe.name}</h2>
      <img src={recipe.img} alt='recipe'/>
      {recipe.summary}
      <p>Health Score: {recipe.healthyFoodLevel}</p>
      <p>Users Ratings: {recipe.score}</p>
      <p> Step by Step: {recipe.stepByStep}</p>
      {recipe.diets.map(d => <span>{d.name}</span>)}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    recipe: state.recipeDetail
  }
}

export default connect(mapStateToProps, null)(RecipeDetails)