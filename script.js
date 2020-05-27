const editButton = document.querySelector(".profile__edit")
const popup = document.querySelector(".pop-up")
const closeButton = document.querySelector(".pop-up__close")
const overlay = document.querySelector(".overlay")
const editFormName = document.querySelector(".pop-up__name-input")
const editFormOccupation = document.querySelector(".pop-up__occupation-input")
const name = document.querySelector(".profile__name")
const occupation = document.querySelector(".profile__occupation")
const submitButton = document.querySelector(".pop-up__save")

function openPopup() {
  popup.classList.toggle('pop-up_opened')
  overlay.classList.add('overlay_dark')
}

function closePopup() {
  popup.classList.toggle('pop-up_opened')
  overlay.classList.remove('overlay_dark')
}

function submitForm() {
  name.textContent = editFormName.value
  occupation.textContent = editFormOccupation.value
  overlay.classList.remove('overlay_dark')
  popup.classList.toggle('pop-up_opened')
}
editButton.addEventListener("click", openPopup)
closeButton.addEventListener("click", closePopup)
submitButton.addEventListener("click", submitForm)
