import React, { useState, useEffect } from 'react';
import './Recipes.css'
import foodvectorillustration from '../../img/foodvectorillustration.jpg';
import cooking from '../../img/cooking.gif';
import Recipe from '../Recipe/Recipe';
import FilterBar from '../FilterBar/FilterBar';
import Pages from '../Pages/Pages';
import { searchRecipes } from '../../redux/Actions';
import { connect } from 'react-redux';

function Recipes({ location, allRecipes, searchedRecipes, searchRecipes }) {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (location.search !== '') {
      setPage(parseInt(location.search.slice(location.search.indexOf('=')+1)));
    }
  }, [location.search])
  useEffect(() => {
    if (searchedRecipes.length > 0) {
      setRecipes(searchedRecipes.slice((page - 1) * 9, page * 9))
    }
    else {
      setRecipes(allRecipes.slice((page - 1) * 9, page * 9))
    }
  }, [allRecipes, searchedRecipes, page])
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
        }).slice((page - 1) * 9, page * 9))
      case 'Z-A':
        return setRecipes([...allRecipes].sort((a, b) => {
          if (b.name > a.name) {
            return 1;
          }
          if (b.name < a.name) {
            return -1;
          }
          return 0;
        }).slice((page - 1) * 9, page * 9))
      case 'BestScore':
        return setRecipes([...allRecipes].sort((a, b) => { return b.score - a.score }).slice((page - 1) * 9, page * 9))
      case 'WorstScore':
        return setRecipes([...allRecipes].sort((a, b) => { return a.score - b.score }).slice((page - 1) * 9, page * 9))
      default:
        return setRecipes([...allRecipes].slice((page -1) * 9, page * 9))
    }
  }
  function handleFilter(param) {
    if(param !== '') {
      return setRecipes(allRecipes.filter(r => r.diet.includes(param.toLowerCase()))
      .slice((page - 1) * 9, page * 9))
    }
    else {
      return setRecipes([...allRecipes].slice((page -1) * 9, page * 9));
    }
  }

  return (
    <div>
      <FilterBar filter={handleFilter} order={handleOrder} />
      <div id='Recipes'>
        {recipes.length > 0 ? recipes.map(r => <div key={r.name + r.id}>
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
        <Pages allRecipes={allRecipes} page={page} />
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
    searchRecipes: (data) => dispatch(searchRecipes(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)