import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

export default function LandingPage ( {getRecipes, getDiets}) {
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
