export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

//GET https://around.nomoreparties.co/v1/group-3/cards
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }

//GET https://around.nomoreparties.co/v1/group-3/users/me
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }

//POST https://around.nomoreparties.co/v1/group-3/cards
  addCard({title, link}) {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }


  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: "DELETE"
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }

//PUT https://around.nomoreparties.co/v1/group-3/cards/likes/cardId
  likeCard(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: "PUT"
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }

  removeLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: "DELETE"
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }


  setUserInfo({name, about}) {
    fetch(this._baseUrl + '/users/me', {
      method: "PATCH",
      headers: {
        authorization: "0822cc1d-2b11-427a-9c40-48a5387f2b93",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }

// PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar({avatar}) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: {
        authorization: "0822cc1d-2b11-427a-9c40-48a5387f2b93",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }

}
