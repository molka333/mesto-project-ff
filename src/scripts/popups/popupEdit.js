export function initPopupEdit(profileTitle, profileDescription, closeModal, popup, formElement){
  const nameInput = formElement.elements.name;
  const jobInput = formElement.elements.description;
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  function handleFormSubmit(evt) {
      evt.preventDefault();
      const nameInputValue = nameInput.value;
      const jobInputValue = jobInput.value;

      profileTitle.textContent = nameInputValue;
      profileDescription.textContent = jobInputValue;
      
      closeModal(popup);
  }

  formElement.addEventListener('submit', handleFormSubmit);
}

export function initInput(profileTitle, profileDescription, openModal, popup, formElement){
  const nameInput = formElement.elements.name;
  const jobInput = formElement.elements.description;
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popup);
}

