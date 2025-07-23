import '../pages/index.css';
import { createCard, clickLike} from './card.js';
import { openModal, closeModal, setupPopupCloseListeners} from './modal.js';
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
page.querySelectorAll('.popup').forEach((popup) => {
  setupPopupCloseListeners(popup)
});

//popup avatar
const popupTypeEditAvatar = page.querySelector(".popup_type_edit-avatar");
const popupButtonEditAvatar = popupTypeEditAvatar.querySelector('.popup__button');
const formElementAvatar = document.forms['edit-avatar'];
const avatar = formElementAvatar.elements.avatar;
function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  const avatarValue = avatar.value;
  popupButtonEditAvatar.textContent = "Сохранение..."; 
  pathUserAvatar({avatar: avatarValue}, popupButtonEditAvatar)
    .then(res => {
      dom.user.avatar.style.backgroundImage = `url(${avatarValue})`;
      closeModal(popupTypeEditAvatar);
    })
    .catch((err) => { 
      console.log(err); 
    })
    .finally(() => {
      popupButtonEditAvatar.textContent = "Сохранить";
      formElementAvatar.reset();
    });
}
formElementAvatar.addEventListener('submit', handleFormSubmitEditAvatar);
const profileEditAvatarButton = page.querySelector('.profile__image');
profileEditAvatarButton.addEventListener('click', () => {
  resetFormValidation(popupTypeEditAvatar, data);
  openModal(popupTypeEditAvatar);
});

//popup profile edit
const popupTypeEdit = page.querySelector(".popup_type_edit");
const profileTitle = page.querySelector(".profile__title");
const profileDescription = page.querySelector(".profile__description");
const profileEditButton = page.querySelector(".profile__edit-button");
const formElementEditProfile = document.forms['edit-profile'];
const nameInput = formElementEditProfile.elements.name;
const jobInput = formElementEditProfile.elements.description;
const buttonEdit = popupTypeEdit.querySelector('.popup__button');
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  const userData = {
    body: {
      name: nameInputValue,
      about: jobInputValue
    }
  };
  buttonEdit.textContent = "Сохранение...";
  pathUser(userData, buttonEdit)
    .then(res => {
      dom.user.data = res;
      profileTitle.textContent = nameInputValue;
      profileDescription.textContent = jobInputValue;
      closeModal(popupTypeEdit);
    })
    .catch((err) => { 
      console.log(err); 
    }) 
    .finally(() => {
      buttonEdit.textContent = "Сохранить";
    });
}
formElementEditProfile.addEventListener('submit', handleFormSubmitEdit);
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  resetFormValidation(popupTypeEdit, data);
  openModal(popupTypeEdit);
});

//popup card image
const popupTypeImage = page.querySelector(".popup_type_image");
function initCard(item){
  const image = popupTypeImage.querySelector(".popup__image");
  const title = popupTypeImage.querySelector(".popup__caption");
  image.src = item.link;
  image.alt = item.name;
  title.textContent = item.name;
  openModal(popupTypeImage);
}

//popup new card
const popupTypeNewCard = page.querySelector(".popup_type_new-card");
const profileAddButton = page.querySelector(".profile__add-button");
const buttonNewCard = popupTypeNewCard.querySelector('.popup__button');
const formElementNewPlace = document.forms['new-place'];
const nameInputNewPlace = formElementNewPlace.elements['place-name'];
const linkInputNewPlace = formElementNewPlace.elements.link;
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const сard = {
      name:nameInputNewPlace.value,
      link:linkInputNewPlace.value,
    };
  buttonNewCard.textContent = "Сохранение...";
  postCurds({body: сard}, buttonNewCard)
    .then(res => {
      addCardToContainer(res, cardTemplate, clickLike, initCard, putLike, deleteLike, deleteCurds, dom.user.data);
      closeModal(popupTypeNewCard);
      })
    .catch((err) => { 
      console.log(err); 
    })
    .finally(() => {
      buttonNewCard.textContent = "Сохранить";
      formElementNewPlace.reset();
    });
}
formElementNewPlace.addEventListener('submit', handleFormSubmitNewCard);
profileAddButton.addEventListener('click', () => {
  resetFormValidation(popupTypeNewCard, data);
  openModal(popupTypeNewCard);
});

//инициализация валидации
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
    renderCard(initialCards, cardTemplate, clickLike, initCard, putLike, deleteLike, deleteCurds, userData);
  })

// @todo: Вывести карточки на страницу
export function renderCard(initialCards, cardTemplate, clickLike, initCard, putLike, deleteLike, deleteCurds, user) {
  initialCards.forEach((cardInfo) => {
    const cardItem = createCard(cardInfo, cardTemplate, clickLike, initCard, putLike, deleteLike, deleteCurds, user);
    cardList.appendChild(cardItem);
  });
}

export function addCardToContainer(cardData, cardTemplate, clickLike, initCard, putLike, deleteLike, deleteCurds, user) {
  const cardElement = createCard(cardData, cardTemplate, clickLike, initCard, putLike, deleteLike, deleteCurds, user);
  cardList.prepend(cardElement);
}