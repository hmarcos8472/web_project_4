import Popup from "./Popup.js"
import {Card} from "./Card.js"
import UserInfo from "./UserInfo.js"

export default class PopupWithForm extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }
  close(){
    this._popupElement.parentElement.classList.remove("pop-up__container_active")
    document.querySelector(".overlay").classList.remove("overlay_dark")
    document.removeEventListener('keydown', this._handleEscClose)
    /////Reset Form//////
  }
  _getInputValues(){
    const inputs = Array.from(this._popupElement.querySelectorAll(".pop-up__input"))
    return [inputs[0].value, inputs[1].value]
  }
  setEventListeners(){
    this._popupElement.querySelector(".pop-up__close").addEventListener("click", () => {this.close()})
    this._popupElement.querySelector(".pop-up__save").addEventListener("click", () => {
      if (this._popupSelector === ".pop-up") {
        const formValues = this._getInputValues()
        const profileUserInfo = new UserInfo({
          userNameSelector: ".profile__name",
          userOccupationSelector: ".profile__occupation"
        })
        profileUserInfo.setUserInfo(formValues)
      }
      this.close()
    })
  }
}
