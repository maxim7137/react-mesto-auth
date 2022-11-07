import React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
// Импортируем объекты контекста
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

import Login from './Login';
import Register from './Register';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [candidateForRemove, setCandidateForRemove] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
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
  // Обработчик входа
  function handleLogin() {
    setLoggedIn(true);
  }
  function handleLogout() {
    setLoggedIn(false);
  }
  // Защищенный компонент
  function ProtectedComponent() {
    return (
      <>
        <Header>
          <span className="header__email">email@mail.com</span>
          <Link to="/register">
            <button onClick={handleLogout} className="header__button header__button_loggedIn">
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
      <Router>
        <div className="page">
          <div className="container">
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login handleLogin={handleLogin} />
              </Route>
              <ProtectedRoute
                exact path="/"
                loggedIn={loggedIn}
                component={ProtectedComponent}
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

            <Footer />
          </div>
        </div>
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
