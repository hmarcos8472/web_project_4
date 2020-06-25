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

function openEdit() {
  popup.classList.toggle('pop-up_opened')
  popup.classList.add("smooth-popup")
  overlay.classList.add('overlay_dark')
}

function closeEdit() {
  popup.classList.toggle('pop-up_opened')
  popup.classList.remove("smooth-popup")
  overlay.classList.remove('overlay_dark')
}

function submitEdit() {
  name.textContent = editFormName.value
  occupation.textContent = editFormOccupation.value
  overlay.classList.remove('overlay_dark')
  popup.classList.toggle('pop-up_opened')
}

function openAdd() {
  popupAdd.classList.toggle('pop-up_opened')
  popupAdd.classList.add("smooth-popup")
  overlay.classList.add('overlay_dark')
}

function closeAdd() {
  popupAdd.classList.toggle('pop-up_opened')
  popupAdd.classList.remove("smooth-popup")
  overlay.classList.remove('overlay_dark')
}


//Adding Listeners for 'Edit' and 'Add' Buttons/////////////////////////////////
editButton.addEventListener("click", openEdit)
closeButton.addEventListener("click", closeEdit)
submitButton.addEventListener("click", submitEdit)

addButton.addEventListener("click", openAdd)
closeButtonAdd.addEventListener("click", closeAdd)


//Rendering Cards///////////////////////////////////////////////////////////////

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
//Function for Rendering initialCards///////////////////////////////////////////
function renderPlaces(cards) {
  const places = document.querySelector(".element__container")
  const placeTemplate = document.querySelector("#place").content
  for (card of cards) {
    placeCard = placeTemplate.cloneNode(true)
    const link = 'url(' + card.link + ')'
    placeCard.querySelector(".element__image").style.backgroundImage = link
    placeCard.querySelector(".element__title").textContent = card.name
    places.append(placeCard)
  }
}

renderPlaces(initialCards)

//Function for Adding a Card////////////////////////////////////////////////////
const addFormTitle = document.querySelector(".pop-up__title-input")
const addFormLink = document.querySelector(".pop-up__url-input")
const addCardSubmit = document.querySelector(".pop-up__save_add")

function addCard() {
  const places = document.querySelector(".element__container")
  const placeTemplate = document.querySelector("#place").content
  placeCard = placeTemplate.cloneNode(true)
  var card = {
    name: addFormTitle.value,
    link: addFormLink.value,
  }
  const link = 'url(' + card.link + ')'
  placeCard.querySelector(".element__image").style.backgroundImage = link
  placeCard.querySelector(".element__title").textContent = card.name
  places.prepend(placeCard)
  initialCards.unshift(card)
  popupAdd.classList.toggle('pop-up_opened')
  overlay.classList.remove('overlay_dark')
  for (var i = 0 ; i < cardContainer.children.length ; ++i) {
    cardContainer.children[i].querySelector(".element__image").addEventListener("click",popupImage)
  }
  for (var i = 0 ; i < cardContainer.children.length ; ++i) {
    cardContainer.children[i].querySelector(".element__trash").addEventListener("click",deleteImage);
    cardContainer.children[i].querySelector(".element__heart").addEventListener("click",likeImage);
  }
}

addCardSubmit.addEventListener("click", addCard)

//Adding EventListeners for each Card///////////////////////////////////////////
const cardContainer = document.querySelector(".element__container")

//Function for Displaying Popup of Card/////////////////////////////////////////
function popupImage(e) {
  var card = e
  const cardPopupContainer = document.querySelector(".element__pop-up-container")
  const cardPopup = document.querySelector(".element__pop-up")
  const cardTag = document.querySelector(".element__tag")
  cardPopup.style.backgroundImage = card.target.style.backgroundImage
  cardTag.innerText = card.target.parentElement.querySelector(".element__title").innerText
  cardPopupContainer.classList.add("element__pop-up-container_display")
  overlay.classList.add("overlay_dark")
  cardPopup.classList.add("smooth-popup")
}

//Adding EventListeners for Each card///////////////////////////////////////////
for (var i = 0 ; i < cardContainer.children.length ; ++i) {
  cardContainer.children[i].querySelector(".element__image").addEventListener("click",popupImage);
}

//Function for Closing Image Popups/////////////////////////////////////////////
function closeImage() {
  const cardPopupContainer = document.querySelector(".element__pop-up-container")
  cardPopupContainer.classList.remove("element__pop-up-container_display")
  overlay.classList.remove("overlay_dark")
}

const imageCloseButton = document.querySelector(".pop-up__close_image")
imageCloseButton.addEventListener("click", closeImage)


//Function for Deleting Cards///////////////////////////////////////////////////
function deleteImage(e) {
  const card = e
  const correspondingCard = card.target.parentElement.parentElement
  const cardName = correspondingCard.querySelector(".element__title").innerText
  const index = initialCards.map(function (card) { return card.name; }).indexOf(cardName);
  cardContainer.children[index].remove()
}

for (var i = 0 ; i < cardContainer.children.length ; ++i) {
  cardContainer.children[i].querySelector(".element__trash").addEventListener("click",deleteImage);
}

//Function for Liking Images////////////////////////////////////////////////////
function likeImage(e) {
  const button = e
  correspondingCard = button.target.parentElement.parentElement
  const cardName = correspondingCard.querySelector(".element__title").innerText
  const index = initialCards.map(function (card) { return card.name; }).indexOf(cardName);
  const heart = cardContainer.children[index].querySelector(".element__heart")
  heart.style.backgroundImage = "url('./images/heart-icon-filled.svg')"
  console.log(index)
  console.log(heart)
}

for (var i = 0 ; i < cardContainer.children.length ; ++i) {
  cardContainer.children[i].querySelector(".element__heart").addEventListener("click",likeImage);
}
