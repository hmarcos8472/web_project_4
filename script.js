//Declaring Button Elements/////////////////////////////////////////////////////
const editButton = document.querySelector(".profile__edit")
const popup = document.querySelector(".pop-up")
const closeButton = document.querySelector(".pop-up__close")
const overlay = document.querySelector(".overlay")
const editFormName = document.querySelector(".pop-up__name-input")
const editFormOccupation = document.querySelector(".pop-up__occupation-input")
const submitButton = document.querySelector(".pop-up__save")
const name = document.querySelector(".profile__name")
const occupation = document.querySelector(".profile__occupation")

const addButton = document.querySelector(".profile__add")
const popupAdd = document.querySelector(".pop-up_add")
const closeButtonAdd = document.querySelector(".pop-up__close_add")

const cardContainer = document.querySelector("element__container")
const cardPopupContainer = document.querySelector(".element__pop-up-container")
const cardPopup = document.querySelector(".element__pop-up")
const cardTag = document.querySelector(".element__tag")
const cardPopupClose = document.querySelector(".pop-up__close_image")

const addCardButton = document.querySelector(".pop-up__save_add")

const addFormTitle = document.querySelector(".pop-up__title-input")
const addFormLink = document.querySelector(".pop-up__url-input")
const addCardSubmit = document.querySelector(".pop-up__save_add")
const places = document.querySelector(".element__container")
const placeTemplate = document.querySelector("#place").content

function popupHandler(e) {
  if (e.target.className == "profile__edit" || e.target.className == "pop-up__close" || e.target.className == "pop-up__save"){
    popup.classList.toggle("pop-up_opened")
    popup.classList.toggle("smooth-popup")
    overlay.classList.toggle("overlay_dark")
  }
  if (e.target.className == "profile__add" || e.target.className == "pop-up__close pop-up__close_add" || e.target.className == "pop-up__save pop-up__save_add"){
    popupAdd.classList.toggle("pop-up_opened")
    popupAdd.classList.toggle("smooth-popup")
    overlay.classList.toggle("overlay_dark")
  }
  if (e.target.className == "element__image"){
    cardPopup.style.backgroundImage = e.target.style.backgroundImage
    cardTag.innerText = e.target.parentElement.querySelector(".element__title").innerText
    cardPopupContainer.classList.toggle("element__pop-up-container_display")
    overlay.classList.toggle("overlay_dark")
    cardPopup.classList.toggle("smooth-popup")
  }
  if (e.target.className == "pop-up__close pop-up__close_image"){
    cardPopupContainer.classList.toggle("element__pop-up-container_display")
    overlay.classList.toggle("overlay_dark")
    cardPopup.classList.toggle("smooth-popup")
  }
}

function submitEdit(e) {
  name.textContent = editFormName.value
  occupation.textContent = editFormOccupation.value
  popupHandler(e)
}

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

function likeImage(e){
  e.target.style.backgroundImage = 'url(images/heart-icon-filled.svg)'
}

function deleteImage(e){
  const correspondingCard = e.target.parentElement.parentElement
  correspondingCard.parentElement.removeChild(correspondingCard)
}

function createCard(e) {
  if (e.target.className == "pop-up__save pop-up__save_add"){
    const card = {
      name: addFormTitle.value,
      link: addFormLink.value,
    }
    const link = 'url(' + card.link + ')'
    const placeCard = placeTemplate.cloneNode(true)
    placeCard.querySelector(".element__image").style.backgroundImage = link
    placeCard.querySelector(".element__title").textContent = card.name
    placeCard.querySelector(".element__heart").addEventListener("click", likeImage)
    placeCard.querySelector(".element__image").addEventListener("click", popupHandler)
    placeCard.querySelector(".element__trash").addEventListener("click", deleteImage)
    places.prepend(placeCard)
  }
}

function renderCards(cards){
  for (card of cards) {
    const link = 'url(' + card.link + ')'
    const placeCard = placeTemplate.cloneNode(true)
    placeCard.querySelector(".element__image").style.backgroundImage = link
    placeCard.querySelector(".element__title").textContent = card.name
    placeCard.querySelector(".element__heart").addEventListener("click", likeImage)
    placeCard.querySelector(".element__image").addEventListener("click", popupHandler)
    placeCard.querySelector(".element__trash").addEventListener("click", deleteImage)
    places.prepend(placeCard)
  }
}

//Adding Listeners for 'Edit' and 'Add' Buttons/////////////////////////////////
editButton.addEventListener("click", popupHandler)
closeButton.addEventListener("click", popupHandler)
submitButton.addEventListener("click", submitEdit)

addButton.addEventListener("click", popupHandler)
closeButtonAdd.addEventListener("click", popupHandler)
addCardButton.addEventListener("click", popupHandler)

cardPopupClose.addEventListener("click", popupHandler)


addCardButton.addEventListener("click", createCard)
window.addEventListener("load"(renderCards(initialCards)))
