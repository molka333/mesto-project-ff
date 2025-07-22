export function initPopupNewCard(addCardToContainer, cardTemplate, closeModal, popup, clickLike, initCard, popupTypeImage, openModal, postCurds, putLike, deleteLike, deleteCurds, user){
  const formElement = document.forms['new-place'];
  const nameInput = formElement.elements['place-name'];
  const linkInput = formElement.elements.link;
  const button = popup.querySelector('.popup__button');

  function handleFormSubmit(evt) {
      evt.preventDefault();
      const сard = {
          name:nameInput.value,
          link:linkInput.value,
        };
      postCurds({body: сard}, button)
        .then(res => {
        addCardToContainer(res, cardTemplate, clickLike, initCard, popupTypeImage, openModal, putLike, deleteLike, deleteCurds, user.data);
      })
      .finally(() => {
        button.textContent = "Сохраненить";
        closeModal(popup);
        formElement.reset();
      });
  }

  formElement.addEventListener('submit', handleFormSubmit);
}

