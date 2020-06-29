//Declaring Button Elements/////////////////////////////////////////////////////
const editButton = document.querySelector(".profile__edit")
const popup = document.querySelector(".pop-up")
const popupContainerEdit = document.querySelector(".pop-up__container")
const popupContainerAdd = document.querySelector(".pop-up__container_add")
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

const cardPopupContainer = document.querySelector(".element__pop-up-container")
const cardPopup = document.querySelector(".element__pop-up")
const cardTag = document.querySelector(".element__tag")
const cardPopupClose = document.querySelector(".pop-up__close_image")

const addCardButton = document.querySelector(".pop-up__save_add")

const addFormTitle = document.querySelector(".pop-up__title-input")
const addFormLink = document.querySelector(".pop-up__url-input")
const places = document.querySelector(".element__container")
const placeTemplate = document.querySelector("#place").content

function popupHandler(modal){
  modal.classList.toggle("pop-up__container_active")
  overlay.classList.toggle("overlay_dark")
}

function submitEdit() {
  name.textContent = editFormName.value
  occupation.textContent = editFormOccupation.value
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

function popUpImage(e){
  if (e.target.className == "element__image"){
    cardPopup.style.backgroundImage = e.target.style.backgroundImage
    cardTag.innerText = e.target.parentElement.querySelector(".element__title").innerText
    cardPopupContainer.classList.toggle("element__pop-up-container_display")
    overlay.classList.toggle("overlay_dark")
  }
  if (e.target.className == "pop-up__close pop-up__close_image"){
    cardPopupContainer.classList.toggle("element__pop-up-container_display")
    overlay.classList.toggle("overlay_dark")
  }
}

function createCard(card){
  const placeCard = placeTemplate.cloneNode(true)
  const link = 'url(' + card.link + ')'
  const cardImage = placeCard.querySelector(".element__image")
  cardImage.style.backgroundImage = link
  placeCard.querySelector(".element__title").textContent = card.name
  placeCard.querySelector(".element__heart").addEventListener("click", likeImage)
  cardImage.addEventListener("click", popUpImage)
  placeCard.querySelector(".element__trash").addEventListener("click", deleteImage)
  places.prepend(placeCard)
}

function renderCards(){
  initialCards.forEach((card, i) => {
    createCard(card)
  });
}

function addCard(){
  const card = {
    name: addFormTitle.value,
    link: addFormLink.value,
  }
  createCard(card)
}

//Adding Listeners for 'Edit' Buttons///////////////////////////////////////////
editButton.addEventListener("click", function(){
  popupHandler(popupContainerEdit)
})
closeButton.addEventListener("click", function(){
  popupHandler(popupContainerEdit)
})
submitButton.addEventListener("click", function(){
  submitEdit()
  popupHandler(popupContainerEdit)
})

//Adding Listeners for 'Add' Buttons////////////////////////////////////////////
addButton.addEventListener("click", function(){
  popupHandler(popupContainerAdd)
})
closeButtonAdd.addEventListener("click", function(){
  popupHandler(popupContainerAdd)
})
addCardButton.addEventListener("click", function(){
  addCard()
  popupHandler(popupContainerAdd)
})

cardPopupClose.addEventListener("click", popUpImage)


window.addEventListener("load", renderCards)
