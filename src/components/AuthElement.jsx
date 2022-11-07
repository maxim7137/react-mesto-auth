import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { register } from '../utils/Auth';

function AuthElement({ title, btnTitle }) {
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
    const username = email.split('@')[0];
    register(username, password, email).then((res) => {
      if (res.statusCode === 200) {
        setMessage('Вы успешно зарегистрированы');
        history.push('/login');
        console.log(messageAuthElement);
      } else {
        let errorMessage = res.message[0].messages[0].message;
        setMessage(`${errorMessage} Попробуйте еще раз.`);
        console.log(messageAuthElement);
      }
    });
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
