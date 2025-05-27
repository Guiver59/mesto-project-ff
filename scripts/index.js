// Темплейт карточки 
const cardTemplare = document.querySelector('#card-template');
const cardTemplateContent = cardTemplare.content;

// Функция создания карточки
function createCard(cardData, delFunc) {
  // DOM узлы
  const newCard = cardTemplateContent.querySelector('.card').cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardDeleteButton = newCard.querySelector('.card__delete-button');
  const newCardTitle = newCard.querySelector('.card__title');
  newCardImage.src = cardData.link; //в с++ такое обращение с const вызвало бы ошибку, поэтому использовал let. Будем курить мануалы
  newCardImage.alt = cardData.name;
  newCardDeleteButton.addEventListener('click', (evt) => { delFunc(newCard)});    
  newCardTitle.textContent = cardData.name;

  return newCard;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// Вывести карточки на страницу
let cardContainer = document.querySelector('.places__list');
initialCards.forEach((item) => {
  let newCard = createCard(item, deleteCard);
  cardContainer.append(newCard);
});