import React from "react"
import styled from "styled-components"
import colors from "./../../config/colors"

import { OverlayTrigger, Tooltip } from "react-bootstrap"

export default ({ user }: { user: { name: string; when: string } }) => {
  return (
    <>
      <OverlayTrigger
        key={"bottom"}
        placement={"bottom"}
        overlay={
          <Tooltip id={`tooltip-${"bottom"}`}>
            {user.name} / {user.when}
          </Tooltip>
        }
      >
        <InitialLetter>
          {user.name
            .split(" ")
            .map((word: string) => word[0])
            .join("")}
        </InitialLetter>
      </OverlayTrigger>
    </>
  )
}

const InitialLetter = styled.p`
  background-color: ${colors.main};
  padding: 10px;
  border-radius: 50%;
  font-weight: 600;
  color: #fff;
`
