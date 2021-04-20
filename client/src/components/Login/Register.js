import React, { useState } from 'react';
import { addUser } from '../../redux/Actions';
import { connect } from 'react-redux';

function Register({addUser}) {
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validate = (input) => {
    let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,}$/
    let errors = {};
    if(!input.name){
      errors.name = 'Name is required'
    }
    if (!input.email) {
      errors.email = 'email is required';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = 'email is invalid';
    }
    if (!input.password) {
      errors.password = 'Password is required';
    } else if (!pattern.test(input.password)) {
      errors.password = 'Password is invalid';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(input)
  }

  return (
      <form className='LoginForm' onSubmit={(e) => handleSubmit(e)}>
        <p className='Registration'>Registration</p>
        <div className='FormInput'>
          <label>Name:</label>
          <input className={`${errors.name && 'danger'}`}
            type="text" name="name" onChange={handleInputChange} value={input.name} />
          {errors.name && (
            <p className="danger">{errors.name}</p>
          )}
        </div>
        <div className='FormInput'>
          <label>Email:</label>
          <input className={`${errors.email && 'danger'}`}
            type="text" name="email" onChange={(e) => handleInputChange(e)} value={input.email} />
          {errors.email && (
            <p className="danger">{errors.email}</p>
          )}
        </div>
        <div className='FormInput'>
          <label>Password:</label>
          <input className={`${errors.password && 'danger'}`}
            type='password' name='password' onChange={(e) => handleInputChange(e)} value={input.password} />
          {errors.password && (
            <p className="danger">{errors.password}</p>
          )}
        </div>
        <div className='FormInput'>
          <button onClick={() => alert('Registration Successful')}type='submit'>Submit</button>
        </div>
      </form>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: (info) => dispatch(addUser(info))
  }
}

export default connect(null, mapDispatchToProps)(Register)