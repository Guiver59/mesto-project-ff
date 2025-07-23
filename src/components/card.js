import { deleteCard, likeCard, unlikeCard } from "./../components/api.js";
/*import {
  showPopupHandler,
  closePopupListener,
  closePopupHandler,
} from "./../components/modal.js";*/

// Темплейт карточки
const cardTemplare = document.querySelector("#card-template");
const cardTemplateContent = cardTemplare.content;

// Функция создания карточки
function createCard(cardData, delFunc, likeFunc, openFunc, user_id ) {
  // DOM узлы
  const newCard = cardTemplateContent.querySelector(".card").cloneNode(true);
  const newCardImage = newCard.querySelector(".card__image");
  const newCardDeleteButton = newCard.querySelector(".card__delete-button");
  const newCardLikeButton = newCard.querySelector(".card__like-button");
  const newCardLikeCount = newCard.querySelector(".card__like-count");
  const newCardTitle = newCard.querySelector(".card__title");
  newCard._id = cardData._id;
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCardLikeCount.textContent = cardData.likes.length;
  //console.log(cardData.likes);
  if (
    cardData.likes.find((liker) => {
      return liker._id === user_id;
    })
  ) {
    newCardLikeButton.classList.add("card__like-button_is-active");
  }
  newCardLikeButton.addEventListener("click", (evt) => {
    likeFunc(newCard);
  });
  newCardImage.addEventListener("click", (evt) => {
    openFunc(cardData.name, cardData.link);
  });
  newCardTitle.textContent = cardData.name;
  if (cardData.owner._id === user_id) {
    newCardDeleteButton.addEventListener("click", (evt) => {
      delFunc(newCard);
    });
  } else {
    newCardDeleteButton.disabled = true;
    newCardDeleteButton.hidden = true;
  }
  return newCard;
}

export { createCard };
