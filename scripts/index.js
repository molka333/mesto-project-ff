// @todo: Темплейт карточки
// @todo: DOM узлы
const page = document.querySelector(".page");
const cardTemplate = page.querySelector("#card-template").content;
const cardList = page.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item) {
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");

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
function renderCard() {
  initialCards.forEach((cardInfo) => {
    const cardItem = createCard(cardInfo);
    cardList.appendChild(cardItem);
  });
}

renderCard();
