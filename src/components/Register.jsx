import { Link } from 'react-router-dom';
import Header from './Header';
import AuthElement from './AuthElement';

function Register({handlePopupCheck}) {
  return (
    <>
      <Header>
        <Link to="/login">
          <button className="header__button">Войти</button>
        </Link>
      </Header>
      <AuthElement title={'Регистрация'} btnTitle={'Зарегистрироваться'} isRegister={true} handlePopupCheck={handlePopupCheck} />
    </>
  );
}

export default Register;
