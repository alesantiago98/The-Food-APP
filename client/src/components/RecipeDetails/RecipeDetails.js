import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './RecipeDetails.css';
import foodvectorillustration from '../../img/foodvectorillustration.jpg';
import { Link } from 'react-router-dom';

function RecipeDetails({ recipe }) {
  const renderHTML = (rawHTML) => 
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  const [r, setRecipe] = useState({})
  useEffect(()=> {
    setRecipe(recipe)
  }, [recipe])
  useEffect(() => {
    return setRecipe({})
  }, [])
  if(r.name !== undefined) {
  return (
    <div id='Details'>
      <button className='BackButton' onClick={() => setRecipe({})}><Link to='/home'>Back to Home</Link></button>
      <div id='Info'> 
      <h2>{r.name}</h2>
      <h3>Health Score: {r.healthyFoodLevel}</h3>
      <h3>Users Ratings: {r.score}</h3>
      <div className='Diets'>{r.diet ? r.diet.map(d => <h3>{d}</h3>) : null}</div>
      <img id='RecipeImage'src={r.img ? r.img : foodvectorillustration} alt='recipe'/>
      <div id='SummaryAndSBS'>
      {renderHTML(r.summary)}
      <p id='SBS'> Step by Step:</p> 
      {renderHTML(r.stepByStep)}
      </div>
      </div>
    </div>
  )
  } else {
    return (
      <div> Loading...</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipeDetail
  }
}

export default connect(mapStateToProps, null)(RecipeDetails)