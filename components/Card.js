export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._title = data.title
    this._link = data.link
    this._likes = data.likes
    this._likeCount = this._likes.length
    this._id = ""
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
  }

  id(){
    return this._id
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
     this._cardElement.querySelector(".element__likes").textContent = this._likeCount
   }

   _likeCard(isLiked) {
     if (isLiked === false) {
       this._likeCount = this._likeCount + 1
       this._cardElement.querySelector(".element__heart").classList.add("element__heart_filled")
       this._cardElement.querySelector(".element__heart").classList.remove("element__heart_empty")
       this._cardElement.querySelector(".element__likes").textContent = this._likeCount
     } if (isLiked === true) {
       this._likeCount = this._likeCount - 1
       this._cardElement.querySelector(".element__heart").classList.add("element__heart_empty")
       this._cardElement.querySelector(".element__heart").classList.remove("element__heart_filled")
       this._cardElement.querySelector(".element__likes").textContent = this._likeCount
     }
   }

   _deleteCard() {
     this._cardElement.parentElement.removeChild(this._cardElement)
   }

   _setEventListeners(deleteFormPopup) {
     this._cardElement.querySelector(".element__heart").addEventListener("click", () => {
       this._likeCard(this._handleLikeClick(this.id()))
     })
     this._cardElement.querySelector(".element__image").addEventListener("click", (e) => {
       if (e.target.className === "element__image")
       {this._handleCardClick()}
     })
     this._cardElement.querySelector(".element__trash").addEventListener("click", () => {
       deleteFormPopup.open(() => {
         this._deleteCard()
         this._handleDeleteClick(this._id)
       })
     })
   }

}
