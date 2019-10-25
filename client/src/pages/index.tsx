import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../assets/scss/style.scss"
import queryString from "query-string"
import { navigate } from "gatsby"

import { H1, H3 } from "./../components/Styled/Headings"
import { Container, Form, Col, Row } from "react-bootstrap"
import { FaArrowAltCircleRight } from "react-icons/fa"
import Nav from "./../components/Nav"
import ModalBars from "./../components/Modals/Bars"

export default ({ location }) => {
  const initialModalData = {
    show: false,
    id: "",
  }
  const [isLoading, setLoading] = useState<Boolean>(true)
  const [search, setCity] = useState<string>("")
  const [bars, setBars] = useState<[]>([])
  const [modalData, setModalData] = useState<{
    show: Boolean
    id: string
  }>(initialModalData)

  const query = queryString.parse(location.search)
  const onSearch = async () => {
    console.log(query.location)
    const { data } = await axios.post("http://localhost:3000/api/search", {
      city: query.location,
    })
    setBars(data)
    setLoading(false)
  }

  const openModalBar = (id: string) => {
    setModalData({ show: true, id })
  }

  const navigateTo = (path, e) => {
    if (e) e.preventDefault()
    navigate(path)

    setLoading(true)
  }

  useEffect(() => {
    if (query.loading === "true" && isLoading) {
      if (query.search === "true") {
        setLoading(false)
        onSearch()
      }
      if (query.location) {
        setLoading(false)
        setCity(query.location as string)
      }
    }
  }, [location])

  // if (bars.length) console.log(bars[0].name)
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
        <CustomForm
          onSubmit={(e: any) =>
            navigateTo(`/?loading=true&search=true&location=${search}`, e)
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
                    <CardTitle>{name}</CardTitle>
                    <img className="img-fluid" src={photo} />
                    <p>
                      {isOpen ? (
                        <p className="text-info">"Open"</p>
                      ) : (
                        <p className="text-danger">Closed</p>
                      )}
                    </p>
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
const CardTitle = styled.h3`
  text-align: center;
`

const SubmitButton = styled.button``
