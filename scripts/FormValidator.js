export class FormValidator {
  constructor(settings, formElement){
    this._formElement = formElement
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _displayError(input) {
    const errorText = this._formElement.querySelector(`#${input.id}-error`)
    errorText.textContent = input.validationMessage
    errorText.classList.remove(this._errorClass)
    input.classList.add(this._inputErrorClass)
  }

  _hideError(input) {
    const errorText = this._formElement.querySelector(`#${input.id}-error`)
    errorText.textContent = input.validationMessage
    errorText.classList.add(this._errorClass)
    input.classList.remove(this._inputErrorClass)
  }

  _inputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input)
    } else {
      this._displayError(input)
    }
  }

  _setButtonState() {
    const submitButton = this._formElement.querySelector(this._submitButtonSelector)
    const inputsAreValid = this._inputList.every((input) => {
      return input.validity.valid
    })
    if (inputsAreValid) {
      submitButton.disabled = false
      submitButton.classList.remove(this._inactiveButtonClass)
    } else {
      submitButton.disabled = true
      submitButton.classList.add(this._inactiveButtonClass)
    }
  }

  _validateForm() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault()
    })
    this._formElement.addEventListener("input", () => {
      this._setButtonState()
    })
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._inputValidity(input)
      })
    });
  }
  
}
