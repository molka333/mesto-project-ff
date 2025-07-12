import '../pages/index.css';
import { initialCards } from './cards.js';
import { renderCard, addCardToContainer, clickLike} from './card.js';
import { openModal, closeModal} from './modal.js';
import { initPopupEdit } from './popups/popupEdit.js'
import { initPopupNewCard } from './popups/popupNewCard.js'
import { initCard } from './popups/popupImage.js'

// @todo: Темплейт карточки
// @todo: DOM узлы
const page = document.querySelector(".page");
const cardTemplate = page.querySelector("#card-template").content;
const cardList = page.querySelector(".places__list");

// popup
const popupTypeEdit = page.querySelector(".popup_type_edit");
const profileTitle = page.querySelector(".profile__title");
const profileDescription = page.querySelector(".profile__description");
initPopupEdit(profileTitle, profileDescription, closeModal, popupTypeEdit)
const profileEditButton = page.querySelector(".profile__edit-button");
profileEditButton.addEventListener('click', () => openModal(popupTypeEdit))


const popupTypeImage = page.querySelector(".popup_type_image");


const popupTypeNewCard = page.querySelector(".popup_type_new-card");
const profileAddButton = page.querySelector(".profile__add-button");
initPopupNewCard(addCardToContainer, cardTemplate, cardList, closeModal, popupTypeNewCard, clickLike, initCard, popupTypeImage, openModal)
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard))


renderCard(initialCards, cardTemplate, cardList, clickLike, initCard, popupTypeImage, openModal);