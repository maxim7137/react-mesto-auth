import PopupWithForm from './PopupWithForm';

import uniongood from '../images/uniongood.png';
import unionbad from '../images/unionbad.png';

function InfoTooltip({ isOpen, onClose, isRegisterOk }) {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} name="InfoTool">
      <>
        <img
          src={isRegisterOk ? uniongood : unionbad}
          alt={
            isRegisterOk
              ? 'Знак успешной регистрации'
              : 'Знак не успешной регистрации'
          }
          className="popup__check-image"
        />
        <p className="popup__check-text">
          {isRegisterOk
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </>
    </PopupWithForm>
  );
}

export default InfoTooltip;
