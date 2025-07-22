export function initPopupEditAvatar(closeModal, popup, pathUserAvatar, user){
  const formElement = document.forms['edit-avatar'];
  const avatar = formElement.elements.avatar;
  const button = popup.querySelector('.popup__button');

  function handleFormSubmit(evt) {
    evt.preventDefault();
    const avatarValue = avatar.value;

    pathUserAvatar({avatar: avatarValue}, button)
      .then(res => {
        user.avatar.style.backgroundImage = `url(${avatarValue})`;
      }).finally(() => {
        button.textContent = "Сохраненить";
        closeModal(popup);
        formElement.reset();
      });
  }

  formElement.addEventListener('submit', handleFormSubmit);
}