import React from "react"
import styled from "styled-components"
import { FaArrowAltCircleRight } from "react-icons/fa"

import { Form } from "react-bootstrap"

export default ({
  search,
  navigateTo,
  setCity,
}: {
  search: string
  navigateTo: (path: string, e: any) => void
  setCity: (city: string) => void
}) => {
  return (
    <CustomForm
      onSubmit={(e: any) =>
        navigateTo(`/?loading=true&search=true&location=${search}&page=1`, e)
      }
    >
      <FormGroup controlId="formBasicSearch">
        <FormControl
          type="text"
          placeholder="Where are you at ?"
          value={search}
          onChange={(e: any) => setCity(e.target.value)}
        />
      </FormGroup>
      <SubmitButton type="submit">
        <FaArrowAltCircleRight />
      </SubmitButton>
    </CustomForm>
  )
}

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

const SubmitButton = styled.button``
