import close from '../images/close.svg';

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onSubmit
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-button cross"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        >
          <img
            src={close}
            alt="Крест"
            className="popup__close-button-img cross__img"
          />
        </button>
        <div className="popup__form-container">
          <h2 className="popup__heading">{title}</h2>
          <form
            name={name}
            className={`popup__form popup__form_${name}`}
            onSubmit={onSubmit}
          >
            {children}
            <button
              type="submit"
              className="popup__button"
              aria-label={buttonText}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PopupWithForm;
