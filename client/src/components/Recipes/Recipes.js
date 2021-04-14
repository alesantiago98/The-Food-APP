import React, { useState, useEffect } from 'react';
import './Recipes.css'
import Recipe from '../Recipe/Recipe';
import { connect } from 'react-redux';
import foodvectorillustration from '../../img/foodvectorillustration.jpg';

function Recipes({ location, allRecipes, searchedRecipes, diets }) {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (location.search[location.search.length - 1] !== undefined) {
      setPage(location.search[location.search.length - 1]);
    }
    else {
      setPage(1);
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

  function handleOrder(array, param) {
    switch (param) {
      case 'A-Z':
        return [...array].sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      case 'Z-A':
        return [...array].sort((a, b) => {
          if (b.name > a.name) {
            return 1;
          }
          if (b.name < a.name) {
            return -1;
          }
          return 0;
        })
      case 'BestScore':
        return [...array].sort((a, b) => { return b.score - a.score })
      case 'WorstScore':
        return [...array].sort((a, b) => { return a.score - b.score })
      default:
        return [...array];
    }
  }
  function handleFilter(array, param) {
    switch (param) {
      case 'Gluten Free':
        return array.filter(r => r.diet.includes('Gluten Free'.toLowerCase()))
      case 'Ketogenic':
        return array.filter(r => r.diet.includes('Ketogenic'.toLowerCase()))
      case 'Vegetarian':
        return array.filter(r => r.diet.includes('Vegetarian'.toLowerCase()))
      case 'Lacto Ovo Vegetarian':
        return array.filter(r => r.diet.includes('Lacto Ovo Vegetarian'.toLowerCase()))
      case 'Diary Free':
        return array.filter(r => r.diet.includes('Diary Free'.toLowerCase()))
      case 'Vegan':
        return array.filter(r => r.diet.includes('Vegan'.toLowerCase()))
      case 'Pescatarian':
        return array.filter(r => r.diet.includes('Pescatarian'.toLowerCase()))
      case 'Paleolithic':
        return array.filter(r => r.diet.includes('Paleolithic'.toLowerCase()))
      case 'Primal':
        return array.filter(r => r.diet.includes('Primal'.toLowerCase()))
      case 'Whole 30':
        return array.filter(r => r.diet.includes('Whole 30'.toLowerCase()))
      default:
        return [...array];
    }
  }
  return (
    <div>
      <div id='OrderingAndFiltering'>
        <div className='Ordering'>
          <button className='DropdownButton'>Order</button>
          <div className='Orders'>
            <button onClick={() => { setRecipes(handleOrder(allRecipes, '').slice((page - 1) * 9, page * 9)) }}>More Relevants</button>
            <button onClick={() => { setRecipes(handleOrder(allRecipes, 'A-Z').slice((page - 1) * 9, page * 9)) }}>A - Z</button>
            <button onClick={() => { setRecipes(handleOrder(allRecipes, 'Z-A').slice((page - 1) * 9, page * 9)) }}>Z - A</button>
            <button onClick={() => { setRecipes(handleOrder(allRecipes, 'BestScore').slice((page - 1) * 9, page * 9)) }}>Best Score</button>
            <button onClick={() => { setRecipes(handleOrder(allRecipes, 'WorstScore').slice((page - 1) * 9, page * 9)) }}>Worst Score</button>
          </div>
        </div>
        <div className='Filtering'>
          <button className='DropdownButton'>Filter</button>
          <div className='Filters'>
            <button onClick={() => { setRecipes(handleFilter(allRecipes, '').slice((page - 1) * 9, page * 9)) }}>Clean Filters</button>
            {diets.map(d => <button key={d.name}
              onClick={() => { setRecipes(handleFilter(allRecipes, d.name).slice((page - 1) * 9, page * 9)) }}>{d.name}</button>)}
          </div>
        </div>
        <div>
          <button className='DropdownButton'
            onClick={() => setRecipes(allRecipes.slice((page - 1) * 9, page * 9))}>
            Clear Search
            </button>
        </div>
      </div>
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
            There are no recipes
        </div>}
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

export default connect(mapStateToProps, null)(Recipes)