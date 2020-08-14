import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }

  setImageSource(card) {
    this._popupElement.querySelector(".element__pop-up").style.backgroundImage = `url('${card.link}')`
    this._popupElement.querySelector(".element__tag").innerText = card.title
  }
}
