import React, { useState, useEffect } from 'react';
import './Recipes.css'
import Recipe from '../Recipe/Recipe';
import { connect } from 'react-redux';
import foodvectorillustration from '../../img/foodvectorillustration.jpg';
import { getRecipes, getDiets} from '../../redux/Actions'

function Recipes({ getRecipes, getDiets, allRecipes, diets, searchedRecipes }) {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipes();
    getDiets();
  }, [getRecipes, getDiets])
  useEffect(() => {
    if (searchedRecipes.length > 0) {
      setRecipes(searchedRecipes)
    }
    else {
      setRecipes(allRecipes)
    }
  }, [allRecipes, searchedRecipes])
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
        }));
      case 'Z-A':
        return setRecipes([...allRecipes].sort((a, b) => {
          if (b.name > a.name) {
            return 1;
          }
          if (b.name < a.name) {
            return -1;
          }
          return 0;
        }));
      case 'BestScore':
        return setRecipes([...allRecipes].sort((a, b) => { return b.score - a.score }))
      case 'WorstScore':
        return setRecipes([...allRecipes].sort((a, b) => { return a.score - b.score }))
      default:
        return allRecipes;
    }
  }
  function handleFilter(param) {
    switch (param) {
      case 'Gluten Free':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Gluten Free'.toLowerCase())))
      case 'Ketogenic':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Ketogenic'.toLowerCase())))
      case 'Vegetarian':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Vegetarian'.toLowerCase())))
      case 'Lacto Vegetarian':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Lacto Vegetarian'.toLowerCase())))
      case 'Ovo Vegetarian':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Ovo Vegetarian'.toLowerCase())))
      case 'Vegan':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Vegan'.toLowerCase())))
      case 'Pescetarian':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Pescetarian'.toLowerCase())))
      case 'Paleolithic':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Paleolithic'.toLowerCase())))
      case 'Primal':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Primal'.toLowerCase())))
      case 'Whole 30':
        return setRecipes(allRecipes.filter(r => r.diet.includes('Whole 30'.toLowerCase())))
      default:
        return allRecipes;
    }
  }
  return (
    <div>
      <div id='OrderingAndFiltering'>
        <div className='Ordering'>
          <button className='DropdownButton'>Order</button>
          <div className='Orders'>
            <button onClick={() => { setRecipes([]); handleOrder('A-Z') }}>A - Z</button>
            <button onClick={() => { setRecipes([]); handleOrder('Z-A') }}>Z - A</button>
            <button onClick={() => { setRecipes([]); handleOrder('BestScore') }}>Best Score</button>
            <button onClick={() => { setRecipes([]); handleOrder('WorstScore') }}>Worst Score</button>
          </div>
        </div>
        <div className='Filtering'>
          <button className='DropdownButton'>Filter</button>
          <div className='Filters'>
            {diets.map(d => <button key={d.name} onClick={() => { setRecipes([]); handleFilter(d.name) }}>{d.name}</button>)}
          </div>
        </div>
      </div>
      <div id='Recipes'>
        {console.log(recipes)}
        {recipes.map(r => <div key={r.name + r.id}>
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
    allRecipes: state.allRecipes,
    searchedRecipes: state.searchedRecipes,
    diets: state.allDiets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipes: () => dispatch(getRecipes()),
    getDiets: () => dispatch(getDiets())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)