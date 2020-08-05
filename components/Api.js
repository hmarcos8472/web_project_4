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
        title,
        link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Error!' + res.statusText))
    .catch(err => console.log(err))
  }


  removeCard() {

  }

//PUT https://around.nomoreparties.co/v1/group-3/cards/likes/cardId
  changeLikeCardStatus() {

  }


  setUserInfo() {
    fetch("https://around.nomoreparties.co/v1/group-3/users/me", {
      method: "PATCH",
      headers: {
        authorization: "0822cc1d-2b11-427a-9c40-48a5387f2b93",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist"
      })
    });
  }


  setUserAvatar() {

  }

}

// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/group-3",
//   headers: {
//     authorization: "0822cc1d-2b11-427a-9c40-48a5387f2b93",
//     "Content-Type": "application/json"
//   }
// });
