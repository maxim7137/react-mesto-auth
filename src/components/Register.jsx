import Header from './Header';
import Auth from './Auth';

function Register() {
  return (
    <>
      <Header>
        <button className="header__button">Войти</button>
      </Header>
      <Auth
        title={'Регистрация'}
        btnTitle={'Зарегистрироваться'}
      />
    </>
  );
}

export default Register;
