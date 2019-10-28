import React, { useEffect } from "react"
import queryString from "query-string"
import { navigate } from "gatsby"
import Auth from "./../actions/auth"
import { githubLogin } from "./../actions/queries"

import { Spinner } from "react-bootstrap"

export default ({ location }: { location: string }) => {
  const displayError = () => {
    alert("An error occured")
    navigate("/")
  }

  const fetchCode = async (code: string) => {
    const { data = { token: "" }, err } = (await githubLogin(code)) as {
      data?: { token: string }
      err?: any
    }
    if (!err) {
      const { token } = data
      const isTokenStored = new Auth().setToken(token)
      if (!isTokenStored) return displayError()
      navigate("/")
    } else displayError()
  }

  useEffect(() => {
    const { code } = queryString.parse(location.search as any)
    fetchCode(code as string)
  }, [])

  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}
