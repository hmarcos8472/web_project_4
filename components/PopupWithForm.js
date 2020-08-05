import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }
  open(submitButtonType){
    this._popupElement.parentElement.classList.add("pop-up__container_active")
    document.querySelector(".overlay").classList.add("overlay_dark")
    document.addEventListener('keydown', this._handleEscClose)
    this.setEventListeners(submitButtonType)
  }
  close(){
    this._popupElement.parentElement.classList.remove("pop-up__container_active")
    document.querySelector(".overlay").classList.remove("overlay_dark")
    document.removeEventListener('keydown', this._handleEscClose)
    this._popupElement.querySelector(".pop-up__form").reset()
  }
  _getInputValues(){
    const inputs = Array.from(this._popupElement.querySelectorAll(".pop-up__input"))
    return {title: inputs[0].value, link: inputs[1].value}
  }
  setEventListeners(submitButtonType){
    this._popupElement.querySelector(".pop-up__close").addEventListener("click", () => {this.close()})
    this._popupElement.querySelector(".pop-up__save").addEventListener("click", () => {
      submitButtonType()
      this.close()
    })
  }
}
