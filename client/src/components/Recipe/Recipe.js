import React, { useState, useEffect } from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import staricon from '../../img/star-icon.png';
import { addToFavorites, removeFromFavorites, searchRecipeDetail } from '../../redux/Actions'

function Recipe(props) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (props.favorites.filter(r => r.id === props.id).length > 0) {
      setActive(true)
    }
    else {
      setActive(false)
    }
  }, [active, props.id, props.favorites])

  function toggle() {
    setActive(!active)
  }

  function addRecipeToFavorites() {
    if (props.favorites.filter(r => r.id === props.id).length > 0) {
      return props.removeFromFavorites(props.id)
    }
    else {
      return props.addToFavorites(props)
    }
  }

  return (
    <div className='Recipe' >
      <h3 className='RecipeName'>{props.name}</h3>
      <div className='RecipeInfo'><div className='Diets'>
        {props.diets.filter(d => props.diet.includes(d.name.toLowerCase()))
          .map(d => <span className='diets' key={props.name + d.name}>{d.name}</span>)}
      </div>
      <div>Score: {props.score}</div>
      </div>
      <img src={props.img} className='RecipeImage' alt='recipe' />
      <Link to={`/recipe/${props.id}`}>
        <button onClick={() => props.searchRecipeDetail(props.id)} className='MoreInfo'>More Info</button>
      </Link>
      <button className='ButtonFavorite' onClick={() => { addRecipeToFavorites(); toggle() }}>
        <img className={active ? 'active' : 'inactive'} src={staricon} alt='favorite icon' />
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    favorites: state.favoriteRecipes,
    diets: state.allDiets,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToFavorites: recipe => dispatch(addToFavorites(recipe)),
    removeFromFavorites: recipe => dispatch(removeFromFavorites(recipe)),
    searchRecipeDetail: recipe => dispatch(searchRecipeDetail(recipe)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)