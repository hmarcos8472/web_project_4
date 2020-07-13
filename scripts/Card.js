export const cardPopupContainer = document.querySelector(".element__pop-up-container")
export const cardPopup = document.querySelector(".element__pop-up")
export const cardTag = document.querySelector(".element__tag")
export const overlay = document.querySelector(".overlay")

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export class Card {
  constructor(data, templateSelector) {
    this._title = data.name
    this._link = data.link
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".element__card")
    const cardElement = cardTemplate.cloneNode(true)
    return cardElement
  }

  _handleOpenPopup(e) {
    if (e.target.classList == "element__image") {
      document.querySelector(".element__pop-up").style.backgroundImage = `url('${this._link}')`
      document.querySelector(".element__tag").innerText = this._title
      document.querySelector(".element__pop-up-container").classList.toggle("element__pop-up-container_display")
      document.querySelector(".overlay").classList.toggle("overlay_dark")
    }
  }

   generateCard() {
     this._cardElement = this._getTemplate()
     this._cardElement.querySelector(".element__image").style.backgroundImage = `url('${this._link}')`
     this._cardElement.querySelector(".element__title").textContent = this._title
   }

   _likeCard() {
     this._cardElement.querySelector(".element__heart").style.backgroundImage = "url(./../images/heart-icon-filled.svg)"
   }

   _deleteCard() {
     this._cardElement.parentElement.removeChild(this._cardElement)
   }

   _setEventListeners() {
     this._cardElement.querySelector(".element__heart").addEventListener("click", () => {
       this._likeCard()
     })
     this._cardElement.querySelector(".element__image").addEventListener("click", (e) => {
       this._handleOpenPopup(e)
     })
     this._cardElement.querySelector(".element__trash").addEventListener("click", () => {
       this._deleteCard()
     })
   }

}



export function renderInitialCards(cards) {
  cards.forEach((card) => {
    const newCard = new Card(card, "#place")
    newCard.generateCard()
    newCard._setEventListeners()
    document.querySelector(".element__container").append(newCard._cardElement)
  });
}
