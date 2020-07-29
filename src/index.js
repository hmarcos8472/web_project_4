import {Card} from "./../components/Card.js"
import {FormValidator} from "./../components/FormValidator.js"
import PopupWithForm from "./../components/PopupWithForm.js"
import PopupWithImage from "./../components/PopupWithImage.js"
import Section from "./../components/Section.js"
import UserInfo from "./../components/UserInfo.js"
import "./../pages/index.css"

// Declaring Buttons //////////////////////////////////////////////////////////////////////////////
const editButton = document.querySelector(".profile__edit")
const addButton = document.querySelector(".profile__add")
const addCardButton = document.querySelector(".pop-up__save_add")

const editForm = new PopupWithForm(".pop-up")
const addForm = new PopupWithForm(".pop-up_add")
const popupImage = new PopupWithImage(".element__pop-up-container")

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
const cardSection = new Section({renderedItems: initialCards, renderer:
  (item) => {
    const newCard = new Card(item, "#place", function(){
      popupImage.open(item);
    })
    newCard.generateCard()
    newCard._setEventListeners()
    return newCard._cardElement
  }
}, ".element__container")

cardSection.renderAll()

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

//Adding Listeners for 'Edit' Buttons///////////////////////////////////////////
editButton.addEventListener("click", () => {
  editForm.open(() => {
    const inputs = Array.from(editForm._popupElement.querySelectorAll(".pop-up__input"))
    const formValues =  [inputs[0].value, inputs[1].value]
    const profileUserInfo = new UserInfo({
      userNameSelector: ".profile__name",
      userOccupationSelector: ".profile__occupation"
    })
    profileUserInfo.setUserInfo(formValues)
  })
})

//Adding Listeners for 'Add' Buttons////////////////////////////////////////////
addButton.addEventListener("click", () => {
  addForm.open(() => {
    const formValues = addForm._getInputValues()
    const cardData = {name: formValues[0], link: formValues[1]}
    const newCard = new Card(cardData, "#place", function(e){
      popupImage.open(cardData)
    })
    newCard.generateCard()
    newCard._setEventListeners()
    cardSection.addItem(newCard._cardElement)
  })
})
