import React, { useEffect } from "react"
import queryString from "query-string"
import { navigate } from "gatsby"
import axios from "axios"
import Auth from "./../actions/auth"

export default ({ location }) => {
  const displayError = () => {
    alert("An error occured")
    navigate("/")
  }

  const fetchCode = async code => {
    const {
      data: { token },
      err,
    }: any = await axios
      .post("http://localhost:3000/api/github-cb", {
        code,
      })
      .catch(err => ({ err }))
    if (!err) {
      const auth = new Auth()
      const isTokenStored = auth.setToken(token)
      if (!isTokenStored) return displayError()
      navigate("/")
    } else displayError()
  }

  useEffect(() => {
    const { code } = queryString.parse(location.search)
    fetchCode(code)
  }, [])

  return <p>login ...</p>
}
