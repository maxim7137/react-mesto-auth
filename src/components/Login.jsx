import Header from './Header';
import Auth from './Auth';

function Login() {
  return (
    <>
      <Header>
        <button className="header__button">Регистрация</button>
      </Header>
      <Auth title={'Вход'} btnTitle={'Войти'} />
    </>
  );
}

export default Login;
