import './../styles/index.css';
import {initialCards} from './../scripts/cards.js';
import {deleteCard, likeCard, createCard} from './../components/card.js';
import {showPopupHandler, closePopupListener} from './../components/modal.js'

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

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    let newName = nameInput.value;
    let newDesc = descInput.value;
    let profTitle = document.querySelector('.profile__title');
    let profDesc = document.querySelector('.profile__description');
    profTitle.textContent = newName;
    profDesc.textContent = newDesc;
    popupEdit.classList.remove('popup_is-opened');
}

function handleFormAdd(evt) {
    evt.preventDefault(); 
    let newImgName = nameImgInput.value;
    let newLink = linkImgInput.value;
    let cardDesc = {};
    cardDesc.name = newImgName;
    cardDesc.link = newLink;
    let newCard = createCard(cardDesc, deleteCard, likeCard, openCard);
    cardContainer.prepend(newCard);
    popupAdd.classList.remove('popup_is-opened');
    formAdd.reset();
}

//функция просмотра карточки
function openCard(card){  
  showPopupHandler(popupImg);
  let img = popupImg.querySelector('.popup__image');
  let cardImg = card.querySelector('.card__image');
  if(img)
  {
    img.src = cardImg.src;
    img.alt = cardImg.alt;
  }
  let popupCaption = popupImg.querySelector('.popup__caption');
  if(popupCaption) {
    let title = card.querySelector('.card__title');
    if(title) {
      popupCaption.textContent = title.textContent;
    }
  }
}

// Вывести карточки на страницу
let cardContainer = document.querySelector('.places__list');
initialCards.forEach((item) => {
  let newCard = createCard(item, deleteCard, likeCard, openCard);
  cardContainer.append(newCard);
});

editBtn.addEventListener('click', function(evt){
  showPopupHandler(popupEdit);
  let nameInput = popupEdit.querySelector('.popup__input_type_name');
  let profTitle = document.querySelector('.profile__title');
  if(nameInput && profTitle) {
    nameInput.value = profTitle.textContent;
  }
  let descInput = popupEdit.querySelector('.popup__input_type_description');
  let profDesc = document.querySelector('.profile__description');
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

formEdit.addEventListener('submit', handleFormSubmit); 
formAdd.addEventListener('submit', handleFormAdd); 