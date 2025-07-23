const showInputError = (formElement, inputElement, errorMessage, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(data.errorClass);
};

const hideInputError = (formElement, inputElement, data) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(data.errorClass);
  errorElement.textContent = '';
};

const checkCastomValid = (inputElement) => {
  const regex = /^[a-zа-яё\s-]+$/i;
  const isUrlField = inputElement.type === 'url';
  if (isUrlField){
    return true;
  } else return regex.test(inputElement.value);
}

const checkInputValidity = (formElement, inputElement, data) => {
  const errorMessage = inputElement.dataset.errorMessage;
  inputElement.setCustomValidity("")
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, data);
  } else if (!checkCastomValid(inputElement)) {
    inputElement.setCustomValidity(errorMessage);
    showInputError(formElement, inputElement, errorMessage, data);
  } else {
    hideInputError(formElement, inputElement, data);
  }
};

const setEventListeners = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const buttonElement = formElement.querySelector(data.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, data);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function (evt) {
      checkInputValidity(formElement, inputElement, data);
      toggleButtonState(inputList, buttonElement, data);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((element) => {
    return !element.validity.valid || !checkCastomValid(element);
  });
}

const toggleButtonState = (inputList, buttonElement, data) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(data.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(data.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

export const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, data);
  })
}

export const resetFormValidation = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const buttonElement = formElement.querySelector(data.submitButtonSelector);
  
  inputList.forEach(inputElement => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, data);
  });

  toggleButtonState(inputList, buttonElement, data);
};