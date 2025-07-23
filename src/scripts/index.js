import "./../styles/index.css";
//import {initialCards} from './../scripts/cards.js';
import { removeCard, reactCard, createCard } from "./../components/card.js";
import {
  showPopupHandler,
  closePopupListener,
  closePopupHandler,
} from "./../components/modal.js";
import {
  enableValidation,
  clearValidation,
} from "./../components/validation.js";
import {
  loadUserInfo,
  loadCards,
  saveUserInfo,
  addCard,
  updateAvatar,
} from "./../components/api.js";

const profImg = document.querySelector(".profile__image");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
//
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImg = document.querySelector(".popup_type_image");
const popupNewAvatar = document.querySelector(".popup_type_new_avatar");
const popupDelete = document.querySelector(".popup_type_delete_card");

//
const formEdit = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formEdit.querySelector(".popup__input_type_name");
const descInput = formEdit.querySelector(".popup__input_type_description");
const formEditBtn = formEdit.querySelector(".popup__button");
//
const formAdd = document.querySelector('.popup__form[name="new-place"]');
const nameImgInput = formAdd.querySelector(".popup__input_type_card-name");
const linkImgInput = formAdd.querySelector(".popup__input_type_url");
const cardContainer = document.querySelector(".places__list");
//
const formAvatar = document.querySelector('.popup__form[name="new-avatar"]');
const newAvatarURL = document.querySelector(".popup__input_type_url_avatar");

const userInfo = {
  about: "",
  avatar: "",
  cohort: "",
  name: "",
  _id: "",
};

function updateUserInfo(userInf) {
  userInfo.about = userInf.about;
  userInfo.avatar = userInf.avatar;
  userInfo.cohort = userInf.cohort;
  userInfo.name = userInf.name;
  userInfo._id = userInf._id;
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  formEditBtn.textContent = "Сохранение...";
  const newName = nameInput.value;
  const newDesc = descInput.value;
  const promisSaveUserInfo = new Promise(function (resolve, reject) {
    saveUserInfo({ name: newName, about: newDesc })
      .then((res) => {
        //return res
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  promisSaveUserInfo
    .then((newUserData) => {
      const profTitle = document.querySelector(".profile__title");
      const profDesc = document.querySelector(".profile__description");
      profTitle.textContent = newUserData.name;
      profDesc.textContent = newUserData.about;
      closePopupHandler(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEditBtn.textContent = "Сохранить";
    });
  //popupEdit.classList.remove('popup_is-opened');
}

function handleFormAdd(evt) {
  evt.preventDefault();
  const newImgName = nameImgInput.value;
  const newLink = linkImgInput.value;
  const cardDesc = {};
  cardDesc.name = newImgName;
  cardDesc.link = newLink;

  new Promise((resolve, reject) => {
    addCard(cardDesc)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  })
    .then((newCardData) => {
      console.log(newCardData);
      const newCard = createCard(
        newCardData,
        removeCard,
        reactCard,
        openCard,
        userInfo._id,
        popupDelete
      );
      cardContainer.prepend(newCard);
      closePopupHandler(popupAdd);
      formAdd.reset();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleEditAvatar(evt) {
  evt.preventDefault();
  const newAvatarUrl = newAvatarURL.value;
  new Promise((resolve, reject) => {
    updateAvatar(newAvatarUrl)
      .then((userInfo) => {
        resolve(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  })
    .then((newUserInfo) => {
      //console.log(userInfo);
      updateUserInfo(newUserInfo);
      setUserInfo(userInfo);
      formAvatar.reset();
      closePopupHandler(popupNewAvatarAdd);
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция просмотра карточки
function openCard(cardName, imgLink) {
  showPopupHandler(popupImg);
  const img = popupImg.querySelector(".popup__image");
  if (img) {
    img.src = imgLink;
    img.alt = cardName;
  }
  const popupCaption = popupImg.querySelector(".popup__caption");
  if (popupCaption) {
    popupCaption.textContent = cardName;
  }
}

function setUserInfo(userInfo) {
  //console.log(userInfo);
  const profTitle = document.querySelector(".profile__title");
  const profDesc = document.querySelector(".profile__description");
  profTitle.textContent = userInfo.name;
  profDesc.textContent = userInfo.about;
  profImg.style.backgroundImage = `url(${userInfo.avatar})`;
}

/*const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
}; */

// Вывести карточки на страницу
function setCards(initialCards) {
  initialCards.forEach((item) => {
    const newCard = createCard(
      item,
      removeCard,
      reactCard,
      openCard,
      userInfo._id,
      popupDelete
    );
    cardContainer.append(newCard);
  });
}

editBtn.addEventListener("click", function (evt) {
  showPopupHandler(popupEdit);
  const nameInput = popupEdit.querySelector(".popup__input_type_name");
  const profTitle = document.querySelector(".profile__title");
  if (nameInput && profTitle) {
    nameInput.value = profTitle.textContent;
  }
  const descInput = popupEdit.querySelector(".popup__input_type_description");
  const profDesc = document.querySelector(".profile__description");
  if (descInput && profDesc) {
    descInput.value = profDesc.textContent;
  }
  clearValidation(popupEdit, validationConfig);
});

addBtn.addEventListener("click", function (evt) {
  showPopupHandler(popupAdd);
  clearValidation(popupAdd, validationConfig);
});

profImg.addEventListener("click", function (evt) {
  showPopupHandler(popupNewAvatar);
  clearValidation(popupNewAvatar, validationConfig);
});

closePopupListener(popupAdd);
closePopupListener(popupEdit);
closePopupListener(popupImg);
closePopupListener(popupNewAvatar);
closePopupListener(popupDelete);

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleFormAdd);
formAvatar.addEventListener("submit", handleEditAvatar);

enableValidation(validationConfig);

const promiseLoadUser = new Promise(function (resolve, reject) {
  const user = loadUserInfo();
  resolve(user);
});
const promiseLoadCards = new Promise(function (resolve, reject) {
  const cards = loadCards();
  resolve(cards);
});

Promise.all([promiseLoadUser, promiseLoadCards]).then((data) => {
  //console.log(value);
  const userData = data[0];
  updateUserInfo(userData);
  /*userInfo.about = userData.about,
    userInfo.avatar = userData.avatar,
    userInfo.cohort = userData.cohort,
    userInfo.name = userData.name,
    userInfo._id = userData._id*/
  setUserInfo(userData);

  const cards = data[1];
  //console.log(cards);
  setCards(cards);
});
