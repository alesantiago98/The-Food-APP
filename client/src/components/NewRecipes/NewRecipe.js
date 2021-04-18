import React, { useState } from 'react';
import './NewRecipe.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe } from '../../redux/Actions';

function NewRecipe(props) {
  const [form, setForm] = useState({
    user: props.user.id,
    name: '',
    summary: '',
    score: 0,
    healthyFoodLevel: 0,
    stepByStep: '',
    diets: []
  })



  function handleSubmit(e) {
    e.preventDefault();
    console.log(form)
    props.addRecipe(form)
  }
  return (
    <div className='NewR'>
      { props.user.email !== undefined ?
      <form className='RecipeForm' onSubmit={(e) => handleSubmit(e)}>
        <div className='NewRecipeForm'>
          <label className='LabelTitle'>Name:</label>
          <input type='text' name='name'
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <label className='LabelTitle'>Score:</label>
          <input type='number' min='0' max='100' name='score'
            onChange={(e) => setForm({ ...form, score: e.target.value })} />
          <label className='LabelTitle'>Healthy Level:</label>
          <input type='number' min='0' max='100' name='healthy level'
            onChange={(e) => setForm({ ...form, healthyFoodLevel: e.target.value })} />
          <label className='LabelTitle'>Summary:</label>
          <textarea name='summary'
            onChange={(e) => setForm({ ...form, summary: e.target.value })} />
          <label className='LabelTitle'>Step by Step:</label>
          <textarea name='step by step'
            onChange={(e) => setForm({ ...form, stepByStep: e.target.value })} />
        </div>
        <div className='DietsAndSubmitButton'>
          <label className='LabelTitle'> Diets: </label>
          {props.diets.map(d => <label className='DietsLabel' key={d.name + d.id}><input type='checkbox' name={d.name} value={d.id}
            onChange={(e) => setForm({ ...form, diets: [...form.diets, e.target.value] })}
          />{d.name}</label>)}
          <button className='NewRecipeSubmitButton' type='submit'>Submit</button>
        </div>
      </form> :
      <div>
      You must be logged in to submit a recipe...
      <Link className='Link Login' to='/login'><button>Login</button></Link>
      </div>}
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
    addRecipe: info => dispatch(addRecipe(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipe)