import React, { useState } from "react"
import styled from "styled-components"

import { H1, H3 } from "./../components/Styled/Headings"
import { Container, Form } from "react-bootstrap"
import { FaArrowAltCircleRight } from "react-icons/fa"
import Nav from "./../components/Nav"

export default () => {
  const [search, setSearch] = useState<string>("")

  const onSearch = () => {
    console.log(search)
  }

  return (
    <>
      <Nav />
      <Container>
        <H1>Nightlife Coordination App</H1>
        <CustomHeadings>
          See which bars are hoppin' tonight and RSVP ahead of time! <br />
          Remember: take a cab and drink responsibly.
        </CustomHeadings>
      </Container>
      <Content>
        <CustomForm>
          <FormGroup controlId="formBasicSearch">
            <FormControl
              type="text"
              placeholder="Where are you at ?"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </FormGroup>
          <SubmitButton size="2em" onClick={onSearch} />
        </CustomForm>
      </Content>
    </>
  )
}

const CustomHeadings = styled(H3)`
  text-align: center;
`

const Content = styled(Container)`
  margin-top: 3rem;
`

const CustomForm = styled(Form)`
  display: flex;
  justify-content: center;
`

const FormGroup = styled(Form.Group)`
  justify-content: space-around;
  display: flex;
  width: 50%;
`
const FormControl = styled(Form.Control)`
  width: 100%;
  height: 30px;
  margin-right: 10px;
`

const SubmitButton = styled(FaArrowAltCircleRight)`
  cursor: pointer;
`
