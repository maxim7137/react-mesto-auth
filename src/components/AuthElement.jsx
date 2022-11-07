import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { register, authorize } from '../utils/Auth';

function AuthElement({ title, btnTitle, isRegister, handleLogin }) {
  let history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [messageAuthElement, setMessage] = useState('');
  function handleChange(e) {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let username = email;
    if (isRegister) {
      register(username, password, email).then((res) => {
        if (res) {
          setMessage('Вы успешно зарегистрированы');
          history.push('/login');
          console.log(messageAuthElement);
        } else {
          setMessage('Что-то пошло не так! Попробуйте еще раз.');
          console.log(messageAuthElement);
        }
      });
    } else {
      if (!email || !password) {
        console.log('Не введен пароль или email');
        return;
      }
      authorize(username, password)
        .then((data) => {
          if (data.jwt) {
            setPassword('');
            setEmail('');
            handleLogin();
            history.push('/');
          }
        })
        .catch((err) => console.log(err)); // запускается, если пользователь не найден
    }
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">{title}</h2>
      <form onSubmit={handleSubmit} name="auth" className="auth__form">
        <label className="auth__field">
          <input
            onChange={handleChange}
            value={email || ''}
            required
            type="email"
            name="email"
            id="email"
            className="auth__input"
            placeholder="Email"
            minLength="2"
            maxLength="30"
          />
          <span className="auth__error email-error"></span>
        </label>
        <label className="auth__field">
          <input
            onChange={handleChange}
            value={password || ''}
            required
            type="password"
            name="password"
            id="password"
            className="auth__input"
            placeholder="Пароль"
            minLength="6"
            maxLength="30"
          />
          <span className="auth__error password-error"></span>
        </label>
        <button type="submit" className="auth__button" aria-label={btnTitle}>
          {btnTitle}
        </button>
      </form>
      {title === 'Регистрация' && (
        <p className="auth__caption">Уже зарегистрированы? Войти</p>
      )}
    </div>
  );
}

export default AuthElement;
