export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name
    this._link = data.link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".element__card")
    const cardElement = cardTemplate.cloneNode(true)
    return cardElement
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
       if (e.target.className === "element__image")
       {this._handleCardClick()}
     })
     this._cardElement.querySelector(".element__trash").addEventListener("click", () => {
       this._deleteCard()
     })
   }

}
