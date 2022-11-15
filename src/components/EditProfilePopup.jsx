import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, closeByClick }) {
  const user = useContext(CurrentUserContext);
  // Стейты, в которых содержатся значения инпутов
  const [userName, setUserName] = useState(' ');
  const [userDescription, setUserDescription] = useState(' ');

  // Обработчик изменения инпута обновляет стейт
  function handleChange(e) {
    if (e.target.name === 'name') {
      setUserName(e.target.value);
    }
    if (e.target.name === 'about') {
      setUserDescription(e.target.value);
    }
  }
  // Обработчик отправки формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: userName,
      about: userDescription,
    });
  }

  useEffect(() => {
    if (user.name) {
      setUserName(user.name);
      setUserDescription(user.about);
    }
  }, [isOpen, user.name, user.about]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      closeByClick={closeByClick}
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <label className="popup__field">
        <input
          value={userName}
          onChange={handleChange}
          required
          type="text"
          name="name"
          id="user-name-input"
          className="popup__input popup__input_user_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error user-name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          value={userDescription}
          onChange={handleChange}
          required
          type="text"
          name="about"
          id="user-character-input"
          className="popup__input popup__input_user_character"
          placeholder="Занятие"
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error user-character-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
