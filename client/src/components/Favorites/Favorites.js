import React from 'react';
import { connect } from 'react-redux';
import Recipe from '../Recipe/Recipe';
import './Favorites.css';
import foodvectorillustration from '../../img/foodvectorillustration.jpg';

function Favorites(props) {
  return (
    <div>
      <h3>My Favorites</h3>
      <hr />
      <div className='Favorites'>
        {props.favorites.map(r =>
          <div>
            <Recipe
              id={r.id}
              name={r.name}
              img={r.img ? r.img : foodvectorillustration}
              diet={r.diet}
              score={r.score}
            />
          </div>)}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    favorites: state.favoriteRecipes
  }
}

export default connect(mapStateToProps, null)(Favorites)