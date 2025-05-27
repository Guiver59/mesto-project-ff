
// Функция создания карточки
function prepareCard(cardData, delFunc) {
  // Темплейт карточки
  const cardTemplateContent = document.querySelector('#card-template').content; 
  let newCard = cardTemplateContent.querySelector('.card').cloneNode(true);

  // DOM узлы
  let newCardImage = newCard.querySelector('.card__image');
  let newCardDeleteButton = newCard.querySelector('.card__delete-button');
  let newCardTitle = newCard.querySelector('.card__title');
  newCardImage.src = cardData.link;
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
  let newCard = prepareCard(item, deleteCard);
  cardContainer.append(newCard);
});