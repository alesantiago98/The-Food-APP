import React, { useState } from 'react';
import './NewRecipe.css';
import { connect } from 'react-redux';
import { addRecipe } from '../../redux/Actions';

function NewRecipe(props) {
  const [form, setForm] = useState({
    name: '',
    summary: '',
    score: 0,
    healthyFoodLevel: 0,
    stepByStep: '',
    diets: []
  })
  function handleSubmit(e) {
    e.preventDefault();
    props.addRecipe(form)
  }
  return (
    <div>
      <form className='RecipeForm' onSubmit={(e) => handleSubmit(e)}>
        <div className='NewRecipeForm'>
        <label>Name:</label>
        <input type='text' name='name'
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <label>Score:</label>
        <input type='number' min='0' max='100' name='score'
          onChange={(e) => setForm({ ...form, score: e.target.value })} />
        <label>Healthy Level:</label>
        <input type='number' min='0' max='100' name='healthy level'
          onChange={(e) => setForm({ ...form, healthyFoodLevel: e.target.value })} />
        <label>Summary:</label>
        <textarea name='summary'
          onChange={(e) => setForm({ ...form, summary: e.target.value })} />
        <label>Step by Step:</label>
        <textarea name='step by step'
          onChange={(e) => setForm({ ...form, stepByStep: e.target.value })} />
        </div>
        <div className='DietsAndSubmitButton'>{props.diets.map(d=><label className='DietsLabel' key={d.name + d.id}><input type='checkbox' name={d.name} value={d.id}
        onChange={(e) => setForm({ ...form, diets: [...form.diets, e.target.value] })}
        />{d.name}</label>)}
        <button className='NewRecipeSubmitButton' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    diets: state.allDiets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addRecipe: info => dispatch(addRecipe(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipe)