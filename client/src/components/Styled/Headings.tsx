import React from "react"
import styled from "styled-components"
import colors from "./../../config/colors"

const { main: mainColor, dark: darkColor, light: lightColor } = colors

export const H1 = styled.h1`
  color: ${mainColor};
  text-align: center;
`

export const H3 = styled.h3`
  color: ${darkColor};
`