export default class Auth {
  setToken = (token: string) => {
    const isWindow = this.isWindow()
    if (isWindow) {
      window.localStorage.setItem("nightlife", token)
    }
    return isWindow
  }

  isWindow = () => !!window

  isLogged = () => {
    if (this.isWindow) {
      return !!window.localStorage.getItem('nightlife')
    }
    return false
  }
}
