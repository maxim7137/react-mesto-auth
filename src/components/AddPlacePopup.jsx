import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    if (isOpen) {
      nameRef.current.value = '';
      linkRef.current.value = '';
    }
  }, [isOpen]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения рефа
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="card"
      title="Новое место"
      buttonText="Создать"
    >
      <label className="popup__field">
        <input
          ref={nameRef}
          required
          type="text"
          name="name"
          id="card-name-input"
          className="popup__input popup__input_card_name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
        />
        <span className="popup__error card-name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          ref={linkRef}
          required
          type="url"
          name="link"
          id="card-address-input"
          className="popup__input popup__input_card_address"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__error card-address-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
