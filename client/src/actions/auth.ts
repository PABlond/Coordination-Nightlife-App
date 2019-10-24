export default class Auth {
  setToken = (token: string) => {
    const isWindow = this.isWindow()
    if (isWindow) {
      window.localStorage.setItem("nightlife", token)
    }
    return isWindow
  }

  isWindow = () => !!window
}
