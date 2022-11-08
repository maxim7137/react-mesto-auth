import React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { getContent } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

import api from '../utils/Api';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import Login from './Login';
import Register from './Register';

function App() {
  let AppHistory = useHistory();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isRegisterOk, setIsRegisterOk] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [candidateForRemove, setCandidateForRemove] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('uEmail');
  // <-- Контекст текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    api
      .getInitialUser()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Контекст текущего пользователя -->

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function handleDeletePopupClick(card) {
    setCandidateForRemove(card);
    setIsDeletePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  // <-- всё, что касается переменной cards --
  // <-- Карточки
  useEffect(() => {
    api
      .getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // Карточки -->

  // <--Лайки
  function handleLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === newCard._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === newCard._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // Лайки-->

  // <-- Удаление
  function handleSubmitDelete(e) {
    e.preventDefault();
    const card = candidateForRemove;
    api
      .delCard(card._id)
      .then(
        setCards((state) =>
          state.filter((stateCard) => stateCard._id !== card._id)
        )
      )
      .then(closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }
  // Удаление -->
  // -- всё, что касается переменной cards -->

  // Обработчик отправки профиля
  function handleUpdateUser(data) {
    api
      .setUser(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Обработчик отправки аватара
  function handleUpdateAvatar(link) {
    api
      .setAvatar(link)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Обработчик отправки места
  function handleAddPlaceSubmit(data) {
    api
      .setCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Обработчики входа и выхода
  function handleLogin() {
    setLoggedIn(true);
  }
  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }
  // Обработчик успешности регистрации
  function handlePopupCheck(isOk) {
    if (isOk) {
      setIsRegisterOk(true);
    } else {
      setIsRegisterOk(false);
    }
    setIsInfoTooltipPopupOpen(true);
  }
  // Проверка токена
  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверим токен
      getContent(jwt).then((res) => {
        if (res) {
          handleLogin(); // авторизуем пользователя
          setUserEmail(res.email);
          AppHistory.push('/');
        }
      });
    }
  }
  useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  });
  // Защищенный компонент
  function ProtectedComponent({ userEmail }) {
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
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Switch>
            <Route path="/register">
              <Register handlePopupCheck={handlePopupCheck} />
            </Route>
            <Route path="/login">
              <Login handleLogin={handleLogin} />
            </Route>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={ProtectedComponent}
              userEmail={userEmail}
            />
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleSubmitDelete}
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegisterOk={isRegisterOk}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
