function displayErrorMessage(form, input, errorClass, inputErrorClass) {
  const errorText = form.querySelector('#'+ input.id + '-error')
  errorText.textContent = input.validationMessage
  errorText.classList.remove(errorClass)
  input.classList.add(inputErrorClass)
}

function hideErrorMessage(form, input, errorClass, inputErrorClass) {
  const errorText = form.querySelector('#'+ input.id + '-error')
  errorText.textContent = input.validationMessage
  errorText.classList.add(errorClass)
  input.classList.remove(inputErrorClass)
}

function inputValidity(form, input, errorClass, inputErrorClass) {
  if (input.validity.valid) {
    hideErrorMessage(form, input, errorClass, inputErrorClass)
  } else {
    displayErrorMessage(form, input, errorClass, inputErrorClass)
  }
}

function setButtonState(form, {submitButtonSelector, inactiveButtonClass}) {
  const submitButton = form.querySelector(submitButtonSelector)
  const inputs = Array.from(form.elements)
  const inputsAreValid = inputs.every(function(input){
    return input.validity.valid
  })
  if (inputsAreValid) {
    submitButton.disabled = false
    submitButton.classList.remove(inactiveButtonClass)
  } else {
    submitButton.disabled = true
    submitButton.classList.add(inactiveButtonClass)
  }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const forms = [...document.querySelectorAll(formSelector)]
  forms.forEach((form) => {
    const inputs = [...form.querySelectorAll(inputSelector)]
    const submitButton = form.querySelector(submitButtonSelector)
    form.addEventListener("submit", function(e){
      e.preventDefault()
    })
    form.addEventListener("input", function(){
      setButtonState(form, {submitButtonSelector: submitButtonSelector, inactiveButtonClass: inactiveButtonClass})
    })
    inputs.forEach((input) => {
      input.addEventListener("input", function(){
        inputValidity(form, input, errorClass, inputErrorClass)
      })
    });
  });
}

enableValidation({
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__save",
  inactiveButtonClass: "pop-up__save_disabled",
  inputErrorClass: "pop-up__input_type_error",
  errorClass: "pop-up__error_visible"
});
