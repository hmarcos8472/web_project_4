export default class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
    this._popupSelector = popupSelector
  }
  open(){
    if (this._popupSelector === ".element__pop-up-container") {
      document.querySelector(".element__pop-up-container").classList.add("element__pop-up-container_display")
    } else {
      this._popupElement.parentElement.classList.add("pop-up__container_active")
    }
    document.querySelector(".overlay").classList.add("overlay_dark")
    document.addEventListener('keydown', this._handleEscClose)
    this.setEventListeners()
  }
  close(){
    if (this._popupSelector === ".element__pop-up-container") {
      document.querySelector(".element__pop-up-container").classList.remove("element__pop-up-container_display")
    } else {
      this._popupElement.parentElement.classList.remove("pop-up__container_active")
    }
    document.querySelector(".overlay").classList.remove("overlay_dark")
    document.removeEventListener('keydown', this._handleEscClose)
  }
  _handleEscClose(e){
    if (e.key === "Escape"){
      this.close()
    }
  }
  setEventListeners(){
    this._popupElement.querySelector(".pop-up__close").addEventListener("click", () => {this.close()})
  }
}
