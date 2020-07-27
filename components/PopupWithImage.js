import Popup from "./Popup.js"

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }
  open({link, name}){
    this._popupElement.querySelector(".element__pop-up").style.backgroundImage = `url('${link}')`
    this._popupElement.querySelector(".element__tag").innerText = name
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
