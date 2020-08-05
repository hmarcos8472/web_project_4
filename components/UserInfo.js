export default class UserInfo {
  constructor({userNameSelector, userOccupationSelector}) {
    this._userNameSelector = userNameSelector
    this._userOccupationSelector = userOccupationSelector
  }
  getUserInfo(){
    const userName = document.querySelector(this._userNameSelector).value
    const userOccupation = document.querySelector(this._userOccupationSelector).value
    return {name: userName, about: userOccupation}
  }
  setUserInfo({name, about}){
    document.querySelector(".profile__name").textContent = name
    document.querySelector(".profile__occupation").textContent = about
  }
}
