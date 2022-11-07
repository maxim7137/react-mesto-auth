import { Link } from 'react-router-dom';
import Header from './Header';
import AuthElement from './AuthElement';

function Login({handleLogin}) {
  return (
    <>
      <Header>
        <Link to="/register">
          <button className="header__button">Регистрация</button>
        </Link>
      </Header>
      <AuthElement title={'Вход'} btnTitle={'Войти'} isRegister={false} handleLogin={handleLogin}/>
    </>
  );
}

export default Login;
