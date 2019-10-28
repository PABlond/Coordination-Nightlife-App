import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../assets/scss/style.scss"
import "react-datepicker/dist/react-datepicker.css"
import queryString from "query-string"
import { navigate } from "gatsby"
import { search as searchRequest } from "./../actions/queries"

import { H1, H3 } from "./../components/Styled/Headings"
import { Container, Row } from "react-bootstrap"
import Nav from "./../components/Nav"
import ModalBars from "./../components/Modals/Bars"
import Bars from "./../components/Bars"
import Search from "./../components/Search"
import Pagination from "./../components/Pagination"
import { GatsbyImageProps } from "gatsby-image"

export default ({
  data,
  location,
}: {
  data: { file: { childImageSharp: GatsbyImageProps } }
  location: { search: any }
}) => {
  const initialModalData = {
    show: false,
    id: "",
  }
  const [isLoading, setLoading] = useState<Boolean>(true)
  const [search, setCity] = useState<string>("")
  const [bars, setBars] = useState<[]>([])
  const [modalData, setModalData] = useState<{
    show: boolean | undefined
    id: string
  }>(initialModalData)

  const query = queryString.parse(location.search)

  const onSearch = async () => {
    const infos = await searchRequest(
      query.location as string,
      (parseInt(query.page as string) - 1) * 12
    )
    setBars(infos)
    setLoading(false)
  }

  const openModalBar = (id: string) => {
    setModalData({ show: true, id })
  }

  const navigateTo = (path: string, e = undefined) => {
    if (e) (e as any).preventDefault()
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
        <Search search={search} navigateTo={navigateTo} setCity={setCity} />
        <Container>
          <Row>
            <Bars
              bars={bars}
              openModalBar={openModalBar}
              placeholderFluid={data.file.childImageSharp}
            />
            <Pagination query={query as { page: string }} paginate={paginate} />
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
