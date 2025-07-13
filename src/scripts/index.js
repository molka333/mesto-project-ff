import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, clickLike} from './card.js';
import { openModal, closeModal, setupPopupCloseListeners} from './modal.js';
import { initPopupEdit, initInput } from './popups/popupEdit.js'
import { initPopupNewCard } from './popups/popupNewCard.js'
import { initCard } from './popups/popupImage.js'

// @todo: Темплейт карточки
// @todo: DOM узлы
const page = document.querySelector(".page");
const cardTemplate = page.querySelector("#card-template").content;
const cardList = page.querySelector(".places__list");

// popup
const popupTypeEdit = page.querySelector(".popup_type_edit");
setupPopupCloseListeners(popupTypeEdit);
const profileTitle = page.querySelector(".profile__title");
const profileDescription = page.querySelector(".profile__description");
initPopupEdit(profileTitle, profileDescription, closeModal, popupTypeEdit);
const profileEditButton = page.querySelector(".profile__edit-button");
profileEditButton.addEventListener('click', () => initInput(profileTitle, profileDescription, openModal, popupTypeEdit));


const popupTypeImage = page.querySelector(".popup_type_image");
setupPopupCloseListeners(popupTypeImage);


const popupTypeNewCard = page.querySelector(".popup_type_new-card");
const profileAddButton = page.querySelector(".profile__add-button");
setupPopupCloseListeners(popupTypeNewCard);
initPopupNewCard(addCardToContainer, cardTemplate, closeModal, popupTypeNewCard, clickLike, initCard, popupTypeImage, openModal);
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));


// @todo: Вывести карточки на страницу
export function renderCard(initialCards, cardTemplate, clickLike, initCard, popupTypeImage, openModal) {
  initialCards.forEach((cardInfo) => {
    const cardItem = createCard(cardInfo, cardTemplate, clickLike, initCard, popupTypeImage, openModal);
    cardList.appendChild(cardItem);
  });
}

export function addCardToContainer(cardData, cardTemplate, clickLike, initCard, popupTypeImage, openModal) {
  const cardElement = createCard(cardData, cardTemplate, clickLike, initCard, popupTypeImage, openModal);
  cardList.prepend(cardElement);
}


renderCard(initialCards, cardTemplate, clickLike, initCard, popupTypeImage, openModal);