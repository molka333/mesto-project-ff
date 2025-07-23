// @todo: Функция создания карточки
export function createCard(item, cardTemplate, clickLike, initCard, putLike, deleteLike, deleteCurds, user) {
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const countLike = cardItem.querySelector(".card_count-like");
  likeButton.addEventListener('click', () => clickLike(likeButton, countLike, item._id, putLike, deleteLike))
  cardImage.addEventListener('click', () => initCard(item))

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
          const cardItem = evt.target.closest(".places__item");
          cardItem.remove();
        })
        .catch((err) => { 
          console.log(err); 
        })
    });
  } else {
    cardDeleteButton.remove();
  }

  return cardItem;
}

export function clickLike(likeButton, countLike, cardId, putLike, deleteLike){
  const isActive = likeButton.classList.contains('card__like-button_is-active');
  function updateLike(res) {
    countLike.textContent = res.likes.length
    likeButton.classList.toggle("card__like-button_is-active");
  }
  if (isActive) {
    deleteLike(cardId)
      .then(res => {
        updateLike(res);
      })
      .catch((err) => { 
        console.log(err); 
      });
  } else {
    putLike(cardId)
      .then(res => {
        updateLike(res);
      })
      .catch((err) => { 
        console.log(err);
      });
  }
}