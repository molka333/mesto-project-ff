export function initPopupEdit(profileTitle, profileDescription, closeModal, popup, formElement, pathUser, dom){
  const nameInput = formElement.elements.name;
  const jobInput = formElement.elements.description;
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  const button = popup.querySelector('.popup__button');

  function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;

    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = jobInputValue;

    const userData = {
      body: {
        name: nameInputValue,
        about: jobInputValue
      }
    };
    button.textContent = "Сохранение...";
    pathUser(userData, button)
      .then(res => {
        dom.data = res;
      })
      .finally(() => {
        button.textContent = "Сохраненить";
        closeModal(popup);
      });
    
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

