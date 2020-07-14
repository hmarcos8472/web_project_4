import {Card, renderInitialCards} from "./Card.js"
import {FormValidator} from "./FormValidator.js"

// Declaring Buttons and containers //////////////////////////////////////////////////////////////////////////////
const editButton = document.querySelector(".profile__edit")
const popupContainerEdit = document.querySelector(".pop-up__container")
const popupContainerAdd = document.querySelector(".pop-up__container_add")
const closeButton = document.querySelector(".pop-up__close")
const editFormName = document.querySelector(".pop-up__name-input")
const editFormOccupation = document.querySelector(".pop-up__occupation-input")
const submitButton = document.querySelector(".pop-up__save")
const name = document.querySelector(".profile__name")
const occupation = document.querySelector(".profile__occupation")
const addButton = document.querySelector(".profile__add")
const closeButtonAdd = document.querySelector(".pop-up__close_add")
const cardPopupClose = document.querySelector(".pop-up__close_image")
const addCardButton = document.querySelector(".pop-up__save_add")
const addFormTitle = document.querySelector(".pop-up__title-input")
const addFormLink = document.querySelector(".pop-up__url-input")
const overlay = document.querySelector(".overlay")

// Card class /////////////////////////////////////////////////////////////////////////////////////////////////
const initialCards = [
    {
        name: "Esquel, Chubut",
        link: "https://images.unsplash.com/photo-1574451987955-6395ba377b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
    },
    {
        name: "Speikboden",
        link: "https://images.unsplash.com/photo-1522493461283-c57d4e78fa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "Cerro Catedral",
        link: "https://images.unsplash.com/photo-1514399344059-d1128025c6db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "Garnet Lake",
        link: "https://images.unsplash.com/photo-1501776192086-602832fae6e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "Kualoa Ranch",
        link: "https://images.unsplash.com/photo-1545334270-c13944f64dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "El Chalten",
        link: "https://images.unsplash.com/photo-1517154596051-c6b5c62e3276?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1132&q=80"
    }
];
renderInitialCards(initialCards)

// Form Validator class //////////////////////////////////////////////////////////////////////////////////////
const formValidatorSettings = {
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__save",
  inactiveButtonClass: "pop-up__save_disabled",
  inputErrorClass: "pop-up__input_type_error",
  errorClass: "pop-up__error_visible"
}

const forms = [...document.querySelectorAll(".pop-up__form")]
const validateEdit = new FormValidator(formValidatorSettings, forms[0])
const validateAddCard = new FormValidator(formValidatorSettings, forms[1])
validateEdit._validateForm()
validateAddCard._validateForm()

// Submitting forms functionality ////////////////////////////////////////////////////////////////////////////

function popupHandler(modal){
  modal.classList.toggle("pop-up__container_active")
  overlay.classList.toggle("overlay_dark")
}

function submitEdit() {
  name.textContent = editFormName.value
  occupation.textContent = editFormOccupation.value
}

function addCard() {
  const cardData = {
    name: addFormTitle.value,
    link: addFormLink.value,
  }
  const createdCard = new Card(cardData, "#place")
  createdCard.generateCard()
  createdCard._setEventListeners()
  document.querySelector(".element__container").prepend(createdCard._cardElement)
}
// Esc and clicking off functionality ///////////////////////////////////////////////////////////////////////////
function popUpImage() {
  document.querySelector(".element__pop-up-container").classList.remove("element__pop-up-container_display")
  overlay.classList.remove("overlay_dark")
}

function escImage() {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popUpImage(e)
    }
  })
}

function clickOffImage() {
  window.addEventListener("click", (e) => {
    if (e.target.className === "element__pop-up-container element__pop-up-container_display") {
      popUpImage(e)
    }
  })
}

//Adding Listeners for 'Edit' Buttons///////////////////////////////////////////
editButton.addEventListener("click", () => {
  popupHandler(popupContainerEdit)
})
closeButton.addEventListener("click", () => {
  popupHandler(popupContainerEdit)
})
submitButton.addEventListener("click", () => {
  submitEdit()
  popupHandler(popupContainerEdit)
})

//Adding Listeners for 'Add' Buttons////////////////////////////////////////////
addButton.addEventListener("click", () => {
  popupHandler(popupContainerAdd)
})

closeButtonAdd.addEventListener("click", () => {
  popupHandler(popupContainerAdd)
})
addCardButton.addEventListener("click", () => {
  addCard()
  popupHandler(popupContainerAdd)
})

////////////////////////////////////////////////////////////////////////////////

cardPopupClose.addEventListener("click", (e) => {
  popUpImage(e)
})

document.querySelector(".element__container").addEventListener("click", escImage)
document.querySelector(".element__container").addEventListener("click", clickOffImage)
////////////////////////////////////////////////////////////////////////////////
