import React, { useEffect, useState } from "react"
import Auth from "./../../actions/auth"
import { FaGithub } from "react-icons/fa"
import styled from "styled-components"
import { Container, Button } from "react-bootstrap"

export default () => {
  const [user, setUser] = useState<any>({ isLogged: false, username: "" })

  const getUser = async () => {
    const user = await new Auth().user()
    console.log(user)
    setUser({ isLogged: true, username: user.name })
  }

  const logout = () => {
    new Auth().logout()
    setUser({ isLogged: false, username: "" })
  }

  useEffect(() => {
    getUser()
  }, [])
  return user.isLogged ? (
    <Container fluid>
      <MenuItem>
        {user.username} <Button onClick={logout}> Logout</Button>
      </MenuItem>
    </Container>
  ) : (
    <Container fluid>
      <a
        href="https://github.com/login/oauth/authorize?scope=user:email&client_id=4e78567ab3cf78bb6571"
        title="github_login"
      >
        <MenuItem>
          Login
          <GithubLogin size="2em" />
        </MenuItem>
      </a>
    </Container>
  )
}

const MenuItem = styled.p`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #000000;
  text-decoration: none;
`

const GithubLogin = styled(FaGithub)`
  margin-left: 10px;
`
