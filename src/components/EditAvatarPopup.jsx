import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения рефа
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          required
          type="url"
          name="link"
          id="avatar-address-input"
          className="popup__input popup__input_avatar_address"
          placeholder="Ссылка на аватар"
        />
        <span className="popup__error avatar-address-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
