import axios from "axios"

export default class Auth {
  token = "nightlife"

  setToken = (token: string) => {
    const isWindow = this.isWindow()
    if (isWindow) {
      window.localStorage.setItem(this.token, token)
    }
    return isWindow
  }

  isWindow = () => !!window

  isLogged = () => {
    if (this.isWindow) {
      return !!this.getToken()
    }
    return false
  }

  getToken = () =>
    this.isWindow() ? window.localStorage.getItem(this.token) : ""

  user = async () => {
    if (!this.isLogged()) return {}
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    }
    const { data } = await axios.get("http://localhost:3000/api/user", {
      headers,
    })
    return data
  }

  logout = () => {
    if (this.isWindow) {
      window.localStorage.removeItem(this.token)
    }
    return !!this.isWindow
  }
}
