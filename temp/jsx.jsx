// Register.js

import React, { Button } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Register.css';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
        e.preventDefault()
    if (this.state.password === this.state.confirmPassword){
      // сюда добавим логику обработки формы регистрации
    }
  }
  render(){
    return(
      <div className="register">
        <Logo title={'CryptoDucks'}/>
        <p className="register__welcome">
          Please register.
        </p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label htmlFor="username">
            Username:
          </label>
          <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label htmlFor="email">
            Email:
          </label>
          <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="password">
            Password:
          </label>
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <label htmlFor="confirmPassword">
            Confirm password:
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
            <div className="register__button-container">
              <button type="submit" className="register__link">Sign up</button>
            </div>
        </form>
        <div className="register__signin">
          <p>Already a member?</p>
          <Link to="login" className="register__login-link">Log in here</Link>
        </div>
      </div>
    )
  }
}

export default Register;