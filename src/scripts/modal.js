  export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscapeKey);
  }

  export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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
    popup.classList.add('popup_is-animated');
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