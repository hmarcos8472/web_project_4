import Popup from "./Popup.js"

export default class PopupWithForm extends Popup{
  constructor(popupSelector){
    super(popupSelector)
  }

  _getInputValues(){
    const inputs = Array.from(this._popupElement.querySelectorAll(".pop-up__input"))
    return {title: inputs[0].value, link: inputs[1].value}
  }

  resetFormValues() {
    this._popupElement.querySelector(".pop-up__form").reset()
  }

  setEventListeners(submitButtonType){
    this._popupElement.querySelector(".pop-up__close").addEventListener("click", () => {
      this.close()
      this.resetFormValues()
    })
    this._popupElement.querySelector(".pop-up__save").addEventListener("click", () => {
      submitButtonType()
      this.close()
    })
  }
}
