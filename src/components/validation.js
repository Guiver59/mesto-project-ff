function enableValidation(validationConfig) {
  /*{
  formSelector: '.popup__form',+
  inputSelector: '.popup__input',+
  submitButtonSelector: '.popup__button',+
  inactiveButtonClass: 'popup__button_disabled',+
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}*/
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    //console.log(buttonElement);
    toggleButtonState(
      inputList,
      buttonElement,
      validationConfig.inactiveButtonClass
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);
        toggleButtonState(
          inputList,
          buttonElement,
          validationConfig.inactiveButtonClass
        );
      });
    });
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function clearValidation(popup, validationConfig) {
  const profileForm = popup.querySelector(validationConfig.formSelector);
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  if (profileForm && inputList && buttonElement) {
    toggleButtonState(
      inputList,
      buttonElement,
      validationConfig.inactiveButtonClass
    );
  } else {
    console.log("Error clear validation");
  }
}

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

//проверка валидности
function isValid(formElement, inputElement) {
  //console.log(evt.target.validity);
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    //Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    //Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
}

export { enableValidation, clearValidation };
