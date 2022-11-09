import { Link } from 'react-router-dom';

import Header from './Header';
import Main from './Main';

// Защищенный компонент
function ProtectedComponent({
  userEmail,
  handleLogout,
  handleCardClick,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  cards,
  handleLike,
  handleDeletePopupClick
}) {
  return (
    <>
      <Header>
        <span className="header__email">{userEmail}</span>
        <Link to="/register">
          <button
            onClick={handleLogout}
            className="header__button header__button_loggedIn"
          >
            Выйти
          </button>
        </Link>
      </Header>
      <Main
        onHandleCardClick={handleCardClick}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        cards={cards}
        onCardLike={handleLike}
        onCardDelete={handleDeletePopupClick}
      />
    </>
  );
}

export default ProtectedComponent;
