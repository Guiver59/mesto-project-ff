import './../styles/index.css';
import {initialCards} from './../scripts/cards.js';
import {deleteCard, likeCard, createCard} from './../components/card.js';
import {showPopupHandler, closePopupListener, closePopupHandler} from './../components/modal.js'

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
//const plaseList =  document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');
// 
const formEdit = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const descInput = formEdit.querySelector('.popup__input_type_description');
const formAdd = document.querySelector('.popup__form[name="new-place"]');
const nameImgInput = formAdd.querySelector('.popup__input_type_card-name');
const linkImgInput = formAdd.querySelector('.popup__input_type_url');

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const newName = nameInput.value;
    const newDesc = descInput.value;
    const profTitle = document.querySelector('.profile__title');
    const profDesc = document.querySelector('.profile__description');
    profTitle.textContent = newName;
    profDesc.textContent = newDesc;
    closePopupHandler(popupEdit);
    //popupEdit.classList.remove('popup_is-opened');
}

function handleFormAdd(evt) {
    evt.preventDefault(); 
    const newImgName = nameImgInput.value;
    const newLink = linkImgInput.value;
    const cardDesc = {};
    cardDesc.name = newImgName;
    cardDesc.link = newLink;
    const newCard = createCard(cardDesc, deleteCard, likeCard, openCard);
    cardContainer.prepend(newCard);
    //popupAdd.classList.remove('popup_is-opened');
    closePopupHandler(popupAdd);
    formAdd.reset();
}

//функция просмотра карточки
function openCard(card, cardName, imgLink){  
  showPopupHandler(popupImg);
  const img = popupImg.querySelector('.popup__image');
  if(img)
  {
    img.src = imgLink;
    img.alt = cardName;
  }
  const popupCaption = popupImg.querySelector('.popup__caption');
  if(popupCaption) {
    popupCaption.textContent = cardName;
  }
}

// Вывести карточки на страницу
const cardContainer = document.querySelector('.places__list');
initialCards.forEach((item) => {
  const newCard = createCard(item, deleteCard, likeCard, openCard);
  cardContainer.append(newCard);
});

editBtn.addEventListener('click', function(evt){
  showPopupHandler(popupEdit);
  const nameInput = popupEdit.querySelector('.popup__input_type_name');
  const profTitle = document.querySelector('.profile__title');
  if(nameInput && profTitle) {
    nameInput.value = profTitle.textContent;
  }
  const descInput = popupEdit.querySelector('.popup__input_type_description');
  const profDesc = document.querySelector('.profile__description');
  if(descInput && profDesc) {
    descInput.value = profDesc.textContent;
  }
});

addBtn.addEventListener('click', function(evt){
  showPopupHandler(popupAdd);
});

/*plaseList.addEventListener('click', function(evt){
  if(evt.target.classList.contains('card__image')) {
    showPopupHandler(popupImg);
    let img = popupImg.querySelector('.popup__image');
    if(img)
    {
      img.src = evt.target.src;
      img.alt = evt.target.alt;
    }
    let popupCaption = popupImg.querySelector('.popup__caption');
    if(popupCaption) {
      let title = evt.target.parentElement.querySelector('.card__title');
      if(title) {
        popupCaption.textContent = title.textContent;
      }
    }
  }
});*/

closePopupListener(popupAdd);
closePopupListener(popupEdit);
closePopupListener(popupImg);

formEdit.addEventListener('submit', handleProfileFormSubmit); 
formAdd.addEventListener('submit', handleFormAdd); 