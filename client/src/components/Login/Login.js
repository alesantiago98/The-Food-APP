import React, { useState }from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/Actions';
import Register from './Register';
import cooking from '../../img/cooking.jpg';
import './Login.css';

function Login ({ login }) {
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validate = (input) => {
    let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%&]).{8,}$/
    let errors = {};
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
    login(input);
  }

  return (
    <div className='LoginAndRegister'>
      <form className='LoginForm' onSubmit={(e) => handleSubmit(e)}>
      <div className='FormInput'>
      <label>Email:</label>
      <input className={`${errors.email && 'danger'}`}
        type="text" name="email" onChange={handleInputChange} value={input.email} />
        {errors.email && (
          <p className="danger">{errors.email}</p>
        )}
      </div>
      <div className='FormInput'>
        <label>Password:</label>
        <input className={`${errors.password && 'danger'}`}
         type='password' name='password' onChange={(event) => handleInputChange(event)} value={input.password}/>
        {errors.password && (
          <p className="danger">{errors.password}</p>
        )}
      </div>
      <div className='FormInput'>
        <button onClick={() => alert('Login Successful')}type='submit'>Submit</button>
      </div>
    <button className='RegisterButton' onClick={() => setActive(!active)}>Register</button>
    </form>
    {active ? <Register/> : <img className='CookingImg' src={cooking} alt='cooking' />}
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    login: (info) => dispatch(login(info))
  }
}

export default connect(null, mapDispatchToProps)(Login)
