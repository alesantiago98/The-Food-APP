import React, { useState, useEffect } from 'react';
import './Recipes.css'
import foodvectorillustration from '../../img/foodvectorillustration.jpg';
import cooking from '../../img/cooking.gif';
import Recipe from '../Recipe/Recipe';
import FilterBar from '../FilterBar/FilterBar';
import Pages from '../Pages/Pages';
import { getUserRecipe, searchRecipes } from '../../redux/Actions';
import { connect } from 'react-redux';

function Recipes({ location, allRecipes, searchedRecipes, searchRecipes, getUserRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (location.search !== '') {
      setPage(parseInt(location.search.slice(location.search.indexOf('=')+1)));
    }
  }, [location.search])
  useEffect(() => {
    if (searchedRecipes.length > 0) {
      setRecipes(searchedRecipes)
    }
    else {
      setRecipes(allRecipes)
    }
  }, [allRecipes, searchedRecipes])
  useEffect(() => {
    return searchRecipes('')
  }, [searchRecipes])

  function handleOrder(param) {
    switch (param) {
      case 'A-Z':
        return setRecipes([...allRecipes].sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }))
      case 'Z-A':
        return setRecipes([...allRecipes].sort((a, b) => {
          if (b.name > a.name) {
            return 1;
          }
          if (b.name < a.name) {
            return -1;
          }
          return 0;
        }))
      case 'BestScore':
        return setRecipes([...allRecipes].sort((a, b) => { return b.score - a.score }))
      case 'WorstScore':
        return setRecipes([...allRecipes].sort((a, b) => { return a.score - b.score }))
      default:
        return setRecipes([...allRecipes])
    }
  }
  function handleFilter(param) {
    if(param !== '') {
      return setRecipes(allRecipes.filter(r => r.diet.includes(param.toLowerCase()))
      )
    }
    else {
      return setRecipes([...allRecipes]);
    }
  }

  return (
    <div>
      <FilterBar filter={handleFilter} order={handleOrder} userRecipes={getUserRecipe}/>
      <div id='Recipes'>
        {recipes.length > 0 ? recipes.slice((page - 1) * 9, page * 9).map(r => <div key={r.name + r.id}>
          <Recipe
            id={r.id}
            name={r.name}
            img={r.img ? r.img : foodvectorillustration}
            diet={r.diet}
            score={r.score}
          />
        </div>) :
          <div>
            <img src={cooking} alt='cooking gif' />
        </div>}
        <Pages allRecipes={recipes} page={page} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    allRecipes: state.allRecipes,
    searchedRecipes: state.searchedRecipes,
    diets: state.allDiets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchRecipes: (data) => dispatch(searchRecipes(data)),
    getUserRecipe: (id) => dispatch(getUserRecipe(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)