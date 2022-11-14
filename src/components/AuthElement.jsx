import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

function AuthElement({
  title,
  btnTitle,
  isRegister,
  handleLogin,
  handleRegister,
  loggedIn,
}) {
  const [inputData, setInputData] = useState({
    password: '',
    email: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isRegister) {
      handleRegister(inputData.email, inputData.password, inputData.email);
    } else {
      handleLogin(inputData.email, inputData.password);
    }
  }

  if (loggedIn) {
    return <>{loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}</>;
  }

  return (
    <div className="auth">
      <h2 className="auth__heading">{title}</h2>
      <form onSubmit={handleSubmit} name="auth" className="auth__form">
        <label className="auth__field">
          <input
            onChange={handleChange}
            value={inputData.email || ''}
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
            value={inputData.password || ''}
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
        <p className="auth__caption">
          Уже зарегистрированы?{' '}
          <Link to="/login" className="auth__link">
            Войти
          </Link>
        </p>
      )}
    </div>
  );
}

export default AuthElement;