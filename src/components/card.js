// Темплейт карточки 
const cardTemplare = document.querySelector('#card-template');
const cardTemplateContent = cardTemplare.content;

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

//функция лайка
function likeCard(card) {
  const likeBtn = card.querySelector('.card__like-button');
  if(likeBtn) {
    likeBtn.classList.toggle('card__like-button_is-active');
  }
}

// Функция создания карточки
function createCard(cardData, delFunc, likeFunc, openFunc) {
  // DOM узлы
  const newCard = cardTemplateContent.querySelector('.card').cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardDeleteButton = newCard.querySelector('.card__delete-button');
  const newCardLikeButton = newCard.querySelector('.card__like-button');
  const newCardTitle = newCard.querySelector('.card__title');
  newCardImage.src = cardData.link; 
  newCardImage.alt = cardData.name;
  newCardDeleteButton.addEventListener('click', (evt) => { delFunc(newCard)});   
  newCardLikeButton.addEventListener('click', (evt) => { likeFunc(newCard)});   
  newCardImage.addEventListener('click', (evt) => { openFunc(newCard, cardData.name, cardData.link)});
  newCardTitle.textContent = cardData.name;

  return newCard;
}

export {deleteCard, likeCard, createCard}