import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './RecipeDetails.css';
import foodvectorillustration from '../../img/foodvectorillustration.jpg';
import cooking from '../../img/cooking.gif';
import { Link } from 'react-router-dom';

function RecipeDetails({ recipe, diets }) {
  const renderHTML = (rawHTML) =>
    React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  const [r, setRecipe] = useState({})
  useEffect(() => {
    setRecipe(recipe)
  }, [recipe])
  useEffect(() => {
    return setRecipe({})
  }, [])
  if (r.name !== undefined) {
    return (
      <div id='Details'>
        {console.log(r)}
        <button className='BackButton' onClick={() => setRecipe({})}><Link className='Link' to='/home'>Back to Home</Link></button>
        <div id='Info'>
          <h2>{r.name}</h2>
          <h3>Health Score: {r.healthyFoodLevel}</h3>
          <h3>Users Ratings: {r.score}</h3>
          <div className='Diets'>
          {diets.filter(d => {return r.diets.includes(d.name.toLowerCase()) || r.diets.find(diet => d.name === diet.name)})
          .map(d => <h3 className='diets' key={d.name}>{d.name}</h3>)}
          </div>
          <img id='RecipeImage' src={r.img ? r.img : foodvectorillustration} alt='recipe' />
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
      <div>
        <img src={cooking} alt='cooking gif'/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipeDetail,
    diets: state.allDiets
  }
}

export default connect(mapStateToProps)(RecipeDetails)