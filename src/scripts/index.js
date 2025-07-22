import '../pages/index.css';
//import { initialCards } from './cards.js';
import { createCard, clickLike} from './card.js';
import { openModal, closeModal, setupPopupCloseListeners} from './modal.js';
import { initPopupEdit, initInput } from './popups/popupEdit.js'
import { initPopupEditAvatar } from './popups/popupEditAvatar.js'
import { initPopupNewCard } from './popups/popupNewCard.js'
import { initCard } from './popups/popupImage.js'
import { enableValidation, resetFormValidation} from './validation.js'
import { getUser, pathUser, pathUserAvatar, getCurds, postCurds, deleteCurds, putLike, deleteLike} from './api'

// @todo: Темплейт карточки
// @todo: DOM узлы
const page = document.querySelector(".page");
const cardTemplate = page.querySelector("#card-template").content;
const cardList = page.querySelector(".places__list");
const dom = {
  user: {
    data: {},
    name: page.querySelector('.profile__title'),
    about: page.querySelector('.profile__description'),
    avatar: page.querySelector('.profile__image')
  },
}

const data = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_visible'
}

// popup
const popupTypeEditAvatar = page.querySelector(".popup_type_edit-avatar");
setupPopupCloseListeners(popupTypeEditAvatar);
const profileEditAvatarButton = page.querySelector('.profile__image');
initPopupEditAvatar(closeModal, popupTypeEditAvatar, pathUserAvatar, dom.user)
profileEditAvatarButton.addEventListener('click', () => {
  openModal(popupTypeEditAvatar);
});


const popupTypeEdit = page.querySelector(".popup_type_edit");
setupPopupCloseListeners(popupTypeEdit);
const profileTitle = page.querySelector(".profile__title");
const profileDescription = page.querySelector(".profile__description");
const formElement = document.forms['edit-profile'];
initPopupEdit(profileTitle, profileDescription, closeModal, popupTypeEdit, formElement, pathUser, dom.user);
const profileEditButton = page.querySelector(".profile__edit-button");
profileEditButton.addEventListener('click', () => {
  initInput(profileTitle, profileDescription, openModal, popupTypeEdit, formElement);
  resetFormValidation(popupTypeEdit, data);
});


const popupTypeImage = page.querySelector(".popup_type_image");
setupPopupCloseListeners(popupTypeImage);


const popupTypeNewCard = page.querySelector(".popup_type_new-card");
const profileAddButton = page.querySelector(".profile__add-button");
setupPopupCloseListeners(popupTypeNewCard);
initPopupNewCard(addCardToContainer, cardTemplate, closeModal, popupTypeNewCard, clickLike, initCard, popupTypeImage, openModal, postCurds, putLike, deleteLike, deleteCurds, dom.user);
profileAddButton.addEventListener('click', () => {
  openModal(popupTypeNewCard);
  resetFormValidation(popupTypeEdit, data);
});

enableValidation(data);

// @todo: отображение и сохранение пользователя
const renderUser = (user, res) => {
  user.name.textContent = res.name;
  user.about.textContent = res.about;
  user.avatar.style.backgroundImage = `url(${res.avatar})`;
}


Promise.all([getUser(), getCurds()])
  .then(([userData, initialCards]) => {
    dom.user.data = userData;
    renderUser(dom.user, userData);
    renderCard(initialCards, cardTemplate, clickLike, initCard, popupTypeImage, openModal, putLike, deleteLike, deleteCurds, userData);
  })

// @todo: Вывести карточки на страницу
export function renderCard(initialCards, cardTemplate, clickLike, initCard, popupTypeImage, openModal, putLike, deleteLike, deleteCurds, user) {
  initialCards.forEach((cardInfo) => {
    const cardItem = createCard(cardInfo, cardTemplate, clickLike, initCard, popupTypeImage, openModal, putLike, deleteLike, deleteCurds, user);
    cardList.appendChild(cardItem);
  });
}

export function addCardToContainer(cardData, cardTemplate, clickLike, initCard, popupTypeImage, openModal, putLike, deleteLike, deleteCurds, user) {
  const cardElement = createCard(cardData, cardTemplate, clickLike, initCard, popupTypeImage, openModal, putLike, deleteLike, deleteCurds, user);
  cardList.prepend(cardElement);
}

