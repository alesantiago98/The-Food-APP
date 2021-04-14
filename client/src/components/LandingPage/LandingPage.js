import React, { useEffect } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { getRecipes, getDiets} from '../../redux/Actions';
import { connect } from 'react-redux';

function LandingPage ( {getRecipes, getDiets}) {
  useEffect(() => {
    getRecipes();
    getDiets();
  }, [getRecipes, getDiets])
  return (
    <div className='LandingPage'>
      <div id='info'>
      <h1 id='AppTitle'>The Food App</h1>
      <button id='HomeButton'>
        <Link className='Link' to='/home'>
        HOME
        </Link>
      </button>
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipes: () => dispatch(getRecipes()),
    getDiets: () => dispatch(getDiets())
  }
}

export default connect(null, mapDispatchToProps)(LandingPage)