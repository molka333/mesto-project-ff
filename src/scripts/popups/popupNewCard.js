export function initPopupNewCard(addCardToContainer, cardTemplate, closeModal, popup, clickLike, initCard, popupTypeImage, openModal){
  const formElement = document.forms['new-place'];
  const nameInput = formElement.elements['place-name'];
  const linkInput = formElement.elements.link;

  function handleFormSubmit(evt) {
      evt.preventDefault();
      const сard = {
          name:nameInput.value,
          link:linkInput.value,
        };
      formElement.reset();
      addCardToContainer(сard, cardTemplate, clickLike, initCard, popupTypeImage, openModal);
      closeModal(popup);
  }

  formElement.addEventListener('submit', handleFormSubmit);
}

