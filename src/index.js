import {Card} from "../components/Card.js"
import {FormValidator} from "../components/FormValidator.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"
import "../pages/index.css"
import Api from "../components/Api.js"

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-3",
  headers: {
    authorization: "0822cc1d-2b11-427a-9c40-48a5387f2b93",
    "Content-Type": "application/json"
  }
});

api.getInitialCards().then(res => {
  const cardSection = new Section({renderedItems: res, renderer:
    (item) => {
      const newCard = new Card({title: item.name, link: item.link}, "#place", () => {
        popupImage.open({title: item.name, link: item.link});
      })
      newCard.generateCard()
      newCard._setEventListeners()
      return newCard._cardElement
    }
  }, ".element__container")
  cardSection.renderAll()
})

const profileUserInfo = new UserInfo({
  userNameSelector: ".pop-up__name-input",
  userOccupationSelector: ".pop-up__occupation-input"
})

api.getUserInfo().then(res => {
  profileUserInfo.setUserInfo(res)
})

// Declaring Buttons //////////////////////////////////////////////////////////////////////////////
const editButton = document.querySelector(".profile__edit")
const addButton = document.querySelector(".profile__add")

const editForm = new PopupWithForm(".pop-up")
const addForm = new PopupWithForm(".pop-up_add")
const popupImage = new PopupWithImage(".element__pop-up-container")
const cardSection = new Section({renderedItems: [], renderer:
  (item) => {
    const newCard = new Card(item, "#place", () => {
      popupImage.open(item);
    })
    newCard.generateCard()
    newCard._setEventListeners()
    return newCard._cardElement
  }
}, ".element__container")

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
    const formValues =  {name: inputs[0].value, about: inputs[1].value}
    if (formValues.name !== "") {
      profileUserInfo.setUserInfo(formValues)
    }
  })
})

//Adding Listeners for 'Add' Buttons////////////////////////////////////////////
addButton.addEventListener("click", () => {
  addForm.open(() => {
   const formValues = addForm._getInputValues()
   api.addCard({formValues})
   .then(res => {
     console.log({formValues})
   })
    const newCard = new Card({title: formValues.title, link: formValues.link}, "#place", (e) => {
      popupImage.open({title: formValues.title, link: formValues.link})
    })
    newCard.generateCard()
    newCard._setEventListeners()
    if (newCard._link !== ""){
      cardSection.addItem(newCard._cardElement)}
  })
})
