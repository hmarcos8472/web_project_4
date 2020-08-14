import {Card} from "../components/Card.js"
import {FormValidator} from "../components/FormValidator.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"
import "../pages/index.css"
import Api from "../components/Api.js"

const editButton = document.querySelector(".profile__edit")
const addButton = document.querySelector(".profile__add")
const avatar = document.querySelector(".profile__avatar-overlay")

const editForm = new PopupWithForm(".pop-up")
const addForm = new PopupWithForm(".pop-up_add")
const deleteForm = new PopupWithForm(".pop-up_type_delete")
const avatarForm = new PopupWithForm(".pop-up_type_avatar")
const popupImage = new PopupWithImage(".element__pop-up-container")

// console.log(deleteForm._popupElement)
document.querySelector(".profile__name").addEventListener("click", () => {
  deleteForm.open(() => {
    console.log(hello)
  })
})

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-3",
  headers: {
    authorization: "0822cc1d-2b11-427a-9c40-48a5387f2b93",
    "Content-Type": "application/json"
  }
});

const profileUserInfo = new UserInfo({
  userNameSelector: ".pop-up__name-input",
  userOccupationSelector: ".pop-up__occupation-input"
})

api.getUserInfo().then(res => {
  profileUserInfo.setUserInfo(res)
  profileUserInfo.setUserAvatar(res)
})

api.getInitialCards().then(res => {
  const userName = document.querySelector(".profile__name").innerHTML
  const cardSection = new Section({renderedItems: res, renderer:
    (item) => {
      item.likes = item.likes.map((item) => {
        return item.name
      })
      const newCard = new Card({title: item.name, link: item.link, likes: item.likes}, "#place", () => {
        popupImage.open({title: item.name, link: item.link});
      },
      //handleDeleteClick Function
      (cardId) => {
        api.removeCard(cardId)
      },
      //handleLikeClick function
      (cardId) => {
        if (item.likes.includes(userName)) {
          api.removeLike(cardId)
          item.likes.shift(userName)
          return true
        } else {
          api.likeCard(cardId)
          item.likes.unshift(userName)
          return false
        }
      })

      newCard._id = item._id
      newCard.generateCard()
      // This if statement sets the heart icon status according to if you have already liked the image
      if (newCard._likes.includes(userName)) {
        newCard._cardElement.querySelector(".element__heart").classList.add("element__heart_filled")
      } else {
        newCard._cardElement.querySelector(".element__heart").classList.add("element__heart_empty")
      }
      //this if statement removes the delete icon if the card does not belong to you
      if (item.owner.name === document.querySelector(".profile__name").innerHTML) {
        newCard._cardElement.querySelector(".element__trash").style.display = "block"
      }
      newCard._setEventListeners(deleteForm)
      return newCard._cardElement
    }
  }, ".element__container")
  cardSection.renderAll()

  addButton.addEventListener("click", () => {
    addForm.open(() => {
     const formValues = addForm._getInputValues()
     formValues.likes = []

     if (formValues.title !== "") {
       api.addCard(formValues)
       .then(res => {
         const newCard = new Card(formValues, "#place", (e) => {
           popupImage.open({title: formValues.title, link: formValues.link})
         },
         //handleDeleteClick function
         (cardId) => {
           api.removeCard(cardId)
         },
         //handleLikeClick Function
         (cardId) => {
           if (newCard._likes.includes(userName)) {
             api.removeLike(cardId)
             newCard._likes.shift(userName)
             return true
           } else {
             api.likeCard(cardId)
             newCard._likes.unshift(userName)
             return false
           }
         })

         newCard._id = res._id
         newCard.generateCard()
         newCard._cardElement.querySelector(".element__heart").classList.add("element__heart_empty")
         newCard._cardElement.querySelector(".element__trash").style.display = "block"
         newCard._setEventListeners(deleteForm)

         cardSection.addItem(newCard._cardElement)
       })
     }

    })
  })
})


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
const validateDeleteCard = new FormValidator(formValidatorSettings, forms[2])
const validateAvatar = new FormValidator(formValidatorSettings, forms[3])
validateEdit._validateForm()
validateAddCard._validateForm()
validateDeleteCard._validateForm()
validateAvatar._validateForm()

//Adding Listeners for 'Edit' Buttons///////////////////////////////////////////
editButton.addEventListener("click", () => {
  editForm.open(() => {
    const inputs = Array.from(editForm._popupElement.querySelectorAll(".pop-up__input"))
    const formValues =  {name: inputs[0].value, about: inputs[1].value}
    if (formValues.name !== "") {
      profileUserInfo.setUserInfo(formValues)
      api.setUserInfo(formValues)
    }
  })
})

avatar.addEventListener("click", () => {
  avatarForm.open(() => {
    const input = avatarForm._popupElement.querySelector(".pop-up__input")
    const formValue =  {avatar: input.value}
    if (formValue.avatar !== "") {
      console.log(formValue.avatar)
      api.setUserAvatar(formValue)
      profileUserInfo.setUserAvatar(formValue)
    }
  })
})
