export function initPopupEdit(profileTitle, profileDescription, closeModal, popup){
  const formElement = document.forms['edit-profile'];
  const nameInput = formElement.elements.name;
  nameInput.value = profileTitle.textContent;
  const jobInput = formElement.elements.description;
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

