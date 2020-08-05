import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }
  open(card){
    this._popupElement.querySelector(".element__pop-up").style.backgroundImage = `url('${card.link}')`
    this._popupElement.querySelector(".element__tag").innerText = card.title
    document.querySelector(".element__pop-up-container").classList.add("element__pop-up-container_display")
    document.querySelector(".overlay").classList.add("overlay_dark")
    document.addEventListener('keydown', this._handleEscClose)
    this.setEventListeners()
  }
  close(){
    document.querySelector(".element__pop-up-container").classList.remove("element__pop-up-container_display")
    document.querySelector(".overlay").classList.remove("overlay_dark")
    document.removeEventListener('keydown', this._handleEscClose)
  }
}
