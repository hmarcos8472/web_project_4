export default class UserInfo {
  constructor({userNameSelector, userOccupationSelector}) {
    this._userNameSelector = userNameSelector
    this._userOccupationSelector = userOccupationSelector
  }
  getUserInfo(){
    const userName = document.querySelector(this._userNameSelector).value
    const userOccupation = document.querySelector(this._userOccupationSelector).value
    return [userName, userOccupation]
  }
  setUserInfo(inputValues){
    const userInfo = this.getUserInfo()
    document.querySelector(".profile__name").textContent = userInfo[0]
    document.querySelector(".profile__occupation").textContent = userInfo[1]
  }
}
