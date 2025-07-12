// @todo: Функция создания карточки
function createCard(item, cardTemplate, clickLike, initCard, popupTypeImage, openModal) {
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  likeButton.addEventListener('click', () => clickLike(likeButton))
  cardImage.addEventListener('click', () => initCard(item, popupTypeImage, openModal))

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardDeleteButton.addEventListener("click", deleteCard);

  return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
export function renderCard(initialCards, cardTemplate, cardList, clickLike, initCard, popupTypeImage, openModal) {
  initialCards.forEach((cardInfo) => {
    const cardItem = createCard(cardInfo, cardTemplate, clickLike, initCard, popupTypeImage, openModal);
    cardList.appendChild(cardItem);
  });
}

export function addCardToContainer(cardData, cardTemplate, cardList, clickLike, initCard, popupTypeImage, openModal) {
  const cardElement = createCard(cardData, cardTemplate, clickLike, initCard, popupTypeImage, openModal);
  cardList.prepend(cardElement);
}

export function clickLike(likeButton){
  likeButton.classList.toggle("card__like-button_is-active");
}