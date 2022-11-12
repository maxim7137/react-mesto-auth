import { useState, useEffect, useCallback, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { register, authorize, getToken } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/Api';

import ProtectedRoute from './ProtectedRoute';
import ProtectedComponent from './ProtectedComponent';
import Login from './Login';
import Register from './Register';

import Footer from './Footer';
import Loading from './Loading';

import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

// Мемоизированные компоненты
const MemoizedProtectedComponent = memo(ProtectedComponent);
const MemoizedInfoTooltip = memo(InfoTooltip);
const MemoizedLogin = memo(Login);
const MemoizedRegister = memo(Register);

function App() {
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
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [userAuthData, setUserAuthData] = useState(null);

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

  // <-- Обработчики входа и выхода
  const handleLogin = useCallback(async (username, password) => {
    try {
      setLoading(true);
      const data = await authorize(username, password);
      if (!data) {
        throw new Error('Неверное имя или пароль');
      }
      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        setUserAuthData(data.user);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }, []);
  // Обработчики входа и выхода -->

  // <-- Обработчик регистрации
  const handleRegister = useCallback(() => {}, []);
  // Обработчик регистрации -->

  // <-- Обработчик успешности регистрации
  const handlePopupCheck = useCallback((isOk) => {
    if (isOk) {
      setIsRegisterOk(true);
    } else {
      setIsRegisterOk(false);
    }
    setIsInfoTooltipPopupOpen(true);
  }, []);
  // Обработчик успешности регистрации -->
  // <-- Обработчик неуспешности входа
  // Обработчик неуспешности входа -->

  // Проверка токена
  const tokenCheck = useCallback(async () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    try {
      setLoading(true);
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token');
      }
      if (jwt) {
        const user = await getToken(jwt);
        if (!user) {
          throw new Error('no user');
        }
        if (user) {
          setUserAuthData(user);
          setLoggedIn(true);
        }
      }
    } catch (error) {
      console.log('tokenCheck', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, [tokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          {loading ? (
            <Loading />
          ) : (
            <>
              <Switch>
                <Route path="/register">
                  <MemoizedRegister handlePopupCheck={handlePopupCheck} />
                </Route>
                <Route path="/login">
                  <MemoizedLogin
                    handleLogin={handleLogin}
                    setUserEmail={setUserEmail}
                  />
                </Route>
                <ProtectedRoute
                  exact
                  path="/"
                  loggedIn={loggedIn}
                  component={MemoizedProtectedComponent}
                  userEmail={userEmail}
                  handleLogout={handleLogout}
                  handleCardClick={handleCardClick}
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  cards={cards}
                  handleLike={handleLike}
                  handleDeletePopupClick={handleDeletePopupClick}
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
              <MemoizedInfoTooltip
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
                isRegisterOk={isRegisterOk}
              />
              <Footer />
            </>
          )}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
