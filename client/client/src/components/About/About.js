import React from 'react';
import './About.css'

export default function About() {
  return (
    <div className='AboutContainer'>
      <h3>The Food App</h3>
      <hr/>
      <div className='AboutInfo'>
      <p>Recipes app created with React, Redux, Express, Sequelize and PostgreSQL.</p>
      <p>On the homepage you'll have several recipes and can search any recipes by name 
        and it will show some results with basic info of the recipes.</p>
      <p>Every card has a More Info button that will show you a new page 
      with the complete info of the recipe, 
      in which you can find the name, diets, health score and rating from other users.</p>
      <p>Every card has a star that includes the recipe in your favorites, 
      and in the favorites page you can see every card of the recipes you've liked!</p>
      </div>
    </div>
  )
}