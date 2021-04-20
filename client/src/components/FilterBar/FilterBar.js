import React from 'react'; 
import './FilterBar.css';
import { connect } from 'react-redux';
import { searchRecipes } from '../../redux/Actions';
import { Link } from 'react-router-dom';

function FilterBar (props) {
  return (
    <div id='OrderingAndFiltering'>
        <div className='Ordering'>
          <button className='DropdownButton'>Order</button>
          <div className='Orders'>
            <button onClick={(e) => {e.preventDefault(); props.order('')}}>More Relevants</button>
            <button onClick={(e) => {e.preventDefault(); props.order('A-Z')}}>A - Z</button>
            <button onClick={(e) => {e.preventDefault(); props.order('Z-A')}}>Z - A</button>
            <button onClick={(e) => {e.preventDefault(); props.order('BestScore')}}>Best Score</button>
            <button onClick={(e) => {e.preventDefault(); props.order('WorstScore')}}>Worst Score</button>
          </div>
        </div>
        <div className='Filtering'>
          <button className='DropdownButton'>Filter</button>
          <div className='Filters'>
            <button onClick={(e) => { e.preventDefault(); props.filter('');}}>Clean Filters</button>
            {props.diets.map(d => <button key={d.name}
              onClick={(e) => {e.preventDefault(); props.filter(d.name)}}>{d.name}</button>)}
          </div>
        </div>
        <div>
          <button className='DropdownButton'
            onClick={(e) => { e.preventDefault(); searchRecipes(''); props.filter(); }}>
            <Link to='/home' className='Link'>Clear Search</Link>
            </button>
        </div>
        {props.user.id !== undefined ?
        <div>
          <button className='DropdownButton' onClick={() => {props.filter('user')}}>User Recipes</button>
        </div> : null}
      </div>
  )
}

function mapStateToProps(state) {
  return {
    diets: state.allDiets,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchRecipes: (data) => dispatch(searchRecipes(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)