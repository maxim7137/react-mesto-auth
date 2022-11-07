function Auth({ title, btnTitle}) {
  return (
    <div className="auth">
      <h2 className="auth__heading">{title}</h2>
      <form name="auth" className="auth__form">
        <label className="auth__field">
          <input
            defaultValue={''}
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
            defaultValue={''}
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
      {title === 'Регистрация' && <p className="auth__caption">Уже зарегистрированы? Войти</p>}
    </div>
  );
}

export default Auth;
