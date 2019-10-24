import React, { useState } from "react"
import styled from "styled-components"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../assets/scss/style.scss"

import { H1, H3 } from "./../components/Styled/Headings"
import { Container, Form, Col, Row } from "react-bootstrap"
import { FaArrowAltCircleRight } from "react-icons/fa"
import Nav from "./../components/Nav"
import ModalBars from "./../components/Modals/Bars"

export default () => {
  const initialModalData = {
    show: false,
    id: "",
  }
  const [city, setCity] = useState<string>("")
  const [bars, setBars] = useState<[]>([])
  const [modalData, setModalData] = useState<{
    show: Boolean
    id: string
  }>(initialModalData)

  const onSearch = async e => {
    e.preventDefault()
    console.log(city)
    const { data } = await axios.post("http://localhost:3000/api/search", {
      city,
    })
    setBars(data)
  }

  const openModalBar = (id: string) => {
    console.log("CLICkED")
    setModalData({ show: true, id })
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
        <CustomForm onSubmit={onSearch}>
          <FormGroup controlId="formBasicSearch">
            <FormControl
              type="text"
              placeholder="Where are you at ?"
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
            />
          </FormGroup>
          <SubmitButton type="submit">
            <FaArrowAltCircleRight />
          </SubmitButton>
        </CustomForm>
        <Container>
          <Row>
            {bars.map(
              ({
                id,
                name,
                photos: [photo],
                hours: { is_open_now: isOpen },
                location: { formatted_address },
              }: any) => {
                return (
                  <Col md={3} key={id} onClick={() => openModalBar(id)}>
                    <h3>{name}</h3>
                    <img className="img-fluid" src={photo} />
                    <p>{isOpen ? "Open" : "Closed"}</p>
                    <p
                      dangerouslySetInnerHTML={{ __html: formatted_address }}
                    ></p>
                  </Col>
                )
              }
            )}
          </Row>
        </Container>
        <ModalBars
          show={modalData.show}
          handleClose={() => setModalData(initialModalData)}
          id={modalData.id}
        />
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

const SubmitButton = styled.button``
