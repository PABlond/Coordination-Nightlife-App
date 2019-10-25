import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../assets/scss/style.scss"
import "react-datepicker/dist/react-datepicker.css"
import queryString from "query-string"
import { navigate } from "gatsby"

import { H1, H3 } from "./../components/Styled/Headings"
import { Container, Form, Col, Row, Pagination } from "react-bootstrap"
import { FaArrowAltCircleRight } from "react-icons/fa"
import Nav from "./../components/Nav"
import ModalBars from "./../components/Modals/Bars"
import Img from "gatsby-image"

export default ({ data, location }) => {
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
    const { data } = await axios.post("http://localhost:3000/api/search", {
      city: query.location,
      offset: (parseInt(query.page as string) - 1) * 12,
    })
    setBars(data)
    setLoading(false)
  }

  const openModalBar = (id: string) => {
    setModalData({ show: true, id })
  }

  const navigateTo = (path, e = undefined) => {
    if (e) e.preventDefault()
    navigate(path)

    setLoading(true)
  }

  const paginate = (to: string) => {
    const page =
      to === "previous"
        ? parseInt(query.page as string) - 1
        : parseInt(query.page as string) + 1
    navigateTo(
      `/?${queryString.stringify({
        ...query,
        page,
      })}`
    )
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
            navigateTo(
              `/?loading=true&search=true&location=${search}&page=1`,
              e
            )
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
                image_url: photo,
                is_closed,
                phone,
                location: { address1, address2, city },
                going,
              }: any) => {
                return (
                  <Col md={3} key={id} onClick={() => openModalBar(id)}>
                    <CardTitle>{name}</CardTitle>
                    {photo ? (
                      <img className="img-fluid" src={photo} />
                    ) : (
                      <Img {...data.file.childImageSharp} />
                    )}

                    <DescriptionContainer>
                      <DescriptionLine>
                        {!is_closed ? (
                          <span className="text-info">Open</span>
                        ) : (
                          <span className="text-danger">Closed</span>
                        )}
                      </DescriptionLine>
                      <DescriptionLine>
                        <b>Address</b> : {address1 || address2} {city}
                      </DescriptionLine>
                      <DescriptionLine>
                        <b>Phone</b> : {phone}
                      </DescriptionLine>
                      <DescriptionLine>
                        {going.length > 0 ? (
                          <>
                            <b>{going.length} people</b> will be there`
                          </>
                        ) : (
                          "Nobody is interested"
                        )}
                      </DescriptionLine>
                    </DescriptionContainer>
                  </Col>
                )
              }
            )}
            <Pagination>
              {parseInt(query.page as string) > 1 && (
                <Pagination.Prev onClick={() => paginate("previous")} />
              )}

              <Pagination.Next onClick={() => paginate("next")} />
            </Pagination>
          </Row>
        </Container>
        <ModalBars
          show={modalData.show}
          handleClose={() => setModalData(initialModalData)}
          id={modalData.id}
          query={query}
          mainLoading={setLoading}
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
const DescriptionContainer = styled.div`
  margin-bottom: 1rem;
`

const DescriptionLine = styled.p`
  margin-bottom: 0 !important;
`

const CardTitle = styled.h3`
  text-align: center;
`

const SubmitButton = styled.button``

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "noImg.png" }) {
      id
      childImageSharp {
        fluid {
          base64
          tracedSVG
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          originalImg
          originalName
          presentationWidth
          presentationHeight
        }
      }
    }
  }
`
