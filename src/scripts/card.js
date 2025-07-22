// @todo: Функция создания карточки
export function createCard(item, cardTemplate, clickLike, initCard, popupTypeImage, openModal, putLike, deleteLike, deleteCurds, user) {
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const countLike = cardItem.querySelector(".card_count-like");
  likeButton.addEventListener('click', () => clickLike(likeButton, countLike, item._id, putLike, deleteLike))
  cardImage.addEventListener('click', () => initCard(item, popupTypeImage, openModal))

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  countLike.textContent = item.likes.length;


  if (item.likes.find(likes => likes._id === user._id)) {
    likeButton.classList.add("card__like-button_is-active")
  }

  if (user._id === item.owner._id) {
    cardDeleteButton.addEventListener("click", (evt) => {
      deleteCurds(item._id)
        .then((res) => {
          deleteCard(evt);
        })
    });
  } else {
    cardDeleteButton.remove();
  }

  return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();
}

export function clickLike(likeButton, countLike, cardId, putLike, deleteLike){
  const isActive = likeButton.classList.contains('card__like-button_is-active');
  if (isActive) {
    deleteLike(cardId)
      .then(res => {
        countLike.textContent = res.likes.length
      });
  } else {
    putLike(cardId)
      .then(res => {
        countLike.textContent = res.likes.length
      });
  }

  likeButton.classList.toggle("card__like-button_is-active");
}