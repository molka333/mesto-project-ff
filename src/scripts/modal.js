  export function openModal(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
      popup.classList.add('popup_is-opened');
    }, 10);
    document.addEventListener('keydown', handleEscapeKey);
  }

  export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
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

  export function setupPopupCloseListeners(popup) {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) {
        closeModal(popup);
      }
    });
    
    const closeButton = popup.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => closeModal(popup));
    }
  }