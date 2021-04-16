import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { searchRecipes } from '../../redux/Actions';
import { connect } from 'react-redux';
import Logo from '../../img/logo.png';

function NavBar(props) {
  const [recipe, setRecipes] = useState('');
  function handleChange(event) {
    setRecipes(event.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    props.searchRecipes(recipe)
    setRecipes('')
  }
  return (
    <nav className='NavBar'>
      <div className='Links'>
        <img className= 'Logo' src={Logo} alt='Food logo' />
        <Link className='Link Home' to='/home'>Home</Link>
        <Link className='Link About' to='/about'>About</Link>
        <Link className='Link Favorites' to='/favorites'>Favorites</Link>
        <Link className='Link NewRecipe' to='/newRecipe'>Add New Recipe</Link>
      </div>
      <div className='Form'>
        <form
          onSubmit={(e) => { handleSubmit(e) }}>
          <input id='SearchInput' type='text' placeholder='Recipes' value={recipe}
            onChange={(e) => { handleChange(e) }} />
          <input id='SearchSubmitButton' type='submit' value='Search' />
        </form>
      </div>
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    recipes: state.searchedRecipes
  }
}
function mapDispatchToProps(dispatch) {
  return {
    searchRecipes: (recipe) => dispatch(searchRecipes(recipe))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);