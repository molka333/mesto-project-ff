export function initPopupNewCard(addCardToContainer, cardTemplate, cardList, closeModal, popup, clickLike, initCard, popupTypeImage, openModal){
  const formElement = document.forms['new-place'];
  const nameInput = formElement.elements['place-name'];
  const linkInput = formElement.elements.link;

  function handleFormSubmit(evt) {
      evt.preventDefault();
      const Card = {
          name:nameInput.value,
          link:linkInput.value,
        };
      nameInput.value = "";
      linkInput.value = ""
      addCardToContainer(Card, cardTemplate, cardList, clickLike, initCard, popupTypeImage, openModal);
      closeModal(popup);
  }

  formElement.addEventListener('submit', handleFormSubmit);
}

