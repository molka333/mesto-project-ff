// @todo: Функция создания карточки
export function createCard(item, cardTemplate, clickLike, initCard, popupTypeImage, openModal) {
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

export function clickLike(likeButton){
  likeButton.classList.toggle("card__like-button_is-active");
}