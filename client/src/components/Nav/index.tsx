import React from "react"
import { Nav } from "react-bootstrap"
import { FaGithub } from "react-icons/fa"
import styled from "styled-components"

export default () => {
  const login = () => {
    console.log("login")
  }

  return (
    <>
      <a
        href="https://github.com/login/oauth/authorize?scope=user:email&client_id=4e78567ab3cf78bb6571"
        alt="github_login"
      >
        <MenuItem onClick={login}>
          Login
          <GithubLogin size="2em" />
        </MenuItem>
      </a>
    </>
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
