const closePopupEsc = function (evt) {
  if (evt.key === "Escape") {
    const open_popup = document.querySelector(".popup_is-opened");
    if (open_popup) {
      //open_popup.classList.remove('popup_is-opened');
      closePopupHandler(open_popup);
    }
  }
};

let showPopupHandler = function (popup) {
  popup.classList.add("popup_is-opened");
  //popup.addEventListener('keyup',closePopupEsc);
  document.addEventListener("keydown", closePopupEsc);
};

let closePopupHandler = function (popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
};

let closePopupListener = function (popup) {
  popup.addEventListener("click", function (evt) {
    //закрываем окно
    if (
      evt.target.classList.contains("popup__close") || //если нажимаем на кнопку закрытия
      evt.target.classList.contains("popup")
    ) {
      //или не на картинку
      //evt.currentTarget.classList.remove('popup_is-opened');
      //document.removeEventListener('keydown', closePopupEsc);
      closePopupHandler(evt.currentTarget);
    }
  });
};

export { showPopupHandler, closePopupListener, closePopupHandler };
