import React, { useEffect } from "react"
import queryString from "query-string"
import axios from "axios"

export default ({ location }) => {
  const fetchCode = async code => {
    const { data } = await axios.post("http://localhost:3000/api/github-cb", {
      code,
    })
    console.log("body", data)
  }

  useEffect(() => {
    const { code } = queryString.parse(location.search)
    console.log(code)
    fetchCode(code)
  }, [])

  return <p>login Success</p>
}
