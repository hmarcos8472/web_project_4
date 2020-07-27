export default class UserInfo {
  constructor({userNameSelector, userOccupationSelector}) {
    this._userNameSelector = userNameSelector
    this._userOccupationSelector = userOccupationSelector
  }
  getUserInfo(){
    const userName = document.querySelector(this._userNameSelector)
    const userOccupation = document.querySelector(this._userOccupationSelector)
    return [userName, userOccupation]
  }
  setUserInfo(inputValues){
    const userInfo = this.getUserInfo()
    userInfo[0].textContent = inputValues[0]
    userInfo[1].textContent = inputValues[1]
  }
}
