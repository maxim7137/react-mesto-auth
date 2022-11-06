
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
      <div className='header__user'>
        <span className='header__email'>email@mail.com</span>
        <button className='header__button'>Выйти</button>
      </div>
    </header>
  );
}

export default Header;
