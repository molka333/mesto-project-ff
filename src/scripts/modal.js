export function openModal(Popup) {
  Popup.classList.add('popup_is-animated');
  setTimeout(() => {
    Popup.classList.add('popup_is-opened');
  }, 10);
  setupPopupCloseListeners(Popup);
  document.addEventListener('keydown', handleEscapeKey);
}

export function closeModal(Popup) {
  Popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    Popup.classList.remove('popup_is-animated');
  }, 600);
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function setupPopupCloseListeners(Popup) {
  Popup.addEventListener('mousedown', (evt) => {
    if (evt.target === Popup) {
      closeModal(Popup);
    }
  });
  
  const closeButton = Popup.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(Popup));
  }
}