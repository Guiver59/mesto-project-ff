import "./../styles/index.css";
//import {initialCards} from './../scripts/cards.js';
import { createCard } from "./../components/card.js";
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
  deleteCard,
  likeCard,
  unlikeCard,
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
//
const deleteBtn = popupDelete.querySelector(".popup__button");
const popupImage = popupImg.querySelector(".popup__image");
const popupImageCaption = popupImg.querySelector(".popup__caption");
//
const profTitle = document.querySelector(".profile__title");
const profDesc = document.querySelector(".profile__description");

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

//
let cardForDel;
function handleCardDeleteSubmit(evt) {
  //console.log(cardForDel._id);
  deleteCard(cardForDel)
    .then((res) => {
      cardForDel.remove();
      closePopupHandler(popupDelete);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция удаления карточки
function removeCard(card) {
  cardForDel = card;
  showPopupHandler(popupDelete);
}


//функция лайка
function reactCard(card) {
  const newCardLikeCount = card.querySelector(".card__like-count");  
  const likeBtn = card.querySelector(".card__like-button");
  if (likeBtn) {
    if (likeBtn.classList.contains("card__like-button_is-active")) {
      unlikeCard(card)
        .then((card) => {
          likeBtn.classList.remove("card__like-button_is-active");
          newCardLikeCount.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likeCard(card)
        .then((card) => {
          likeBtn.classList.add("card__like-button_is-active");
          newCardLikeCount.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  formEditBtn.textContent = "Сохранение...";
  const newName = nameInput.value;
  const newDesc = descInput.value;
  saveUserInfo({ name: newName, about: newDesc })
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
}

function handleFormAdd(evt) {
  evt.preventDefault();
  const newImgName = nameImgInput.value;
  const newLink = linkImgInput.value;
  const cardDesc = {};
  cardDesc.name = newImgName;
  cardDesc.link = newLink;

  addCard(cardDesc)
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
  updateAvatar(newAvatarUrl)
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
  //const img = popupImg.querySelector(".popup__image");
  if (popupImage) {
    popupImage.src = imgLink;
    popupImage.alt = cardName;
  }
  if (popupImageCaption) {
    popupImageCaption.textContent = cardName;
  }
}

function setUserInfo(userInfo) {
  //console.log(userInfo);
  profTitle.textContent = userInfo.name;
  profDesc.textContent = userInfo.about;
  profImg.style.backgroundImage = `url(${userInfo.avatar})`;
}

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

function editProfileHandler(evt)
{
  showPopupHandler(popupEdit);
  const nameInput = popupEdit.querySelector(".popup__input_type_name");
  if (nameInput && profTitle) {
    nameInput.value = profTitle.textContent;
  }
  const descInput = popupEdit.querySelector(".popup__input_type_description");
  if (descInput && profDesc) {
    descInput.value = profDesc.textContent;
  }
  clearValidation(popupEdit, validationConfig);
}

editBtn.addEventListener("click", editProfileHandler);

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
deleteBtn.addEventListener("click", handleCardDeleteSubmit);

enableValidation(validationConfig);

/*const promiseLoadUser = new Promise(function (resolve, reject) {
  const user = loadUserInfo();
  resolve(user);
});
const promiseLoadCards = new Promise(function (resolve, reject) {
  const cards = loadCards();
  resolve(cards);
});*/

Promise.all([loadUserInfo(), loadCards()]).then(([userData, cards]) => {
  updateUserInfo(userData);
  setUserInfo(userData);
  setCards(cards);
});
