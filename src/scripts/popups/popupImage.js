export function initCard(item, popup, openModal){
  const image = popup.querySelector(".popup__image");
  const title = popup.querySelector(".popup__caption");
  image.src = item.link;
  image.alt = item.name;
  title.textContent = item.name;
  openModal(popup);
}