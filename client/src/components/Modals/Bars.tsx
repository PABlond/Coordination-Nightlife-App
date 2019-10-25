import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import { navigate } from "gatsby"
import queryString from "query-string"
import colors from "./../../config/colors"
import Auth from "./../../actions/auth"

import { Container, Row, Col, Modal, Carousel, Button } from "react-bootstrap"
import DatePicker from "react-datepicker"

export default ({ show, handleClose, id, query, mainLoading }) => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [data, setData] = useState({})
  const [startDate, setStartDate] = useState(null)

  const fetchData = async () => {
    const { data: barInfo } = await axios.post(
      "http://localhost:3000/api/business",
      {
        id,
      }
    )
    console.log(barInfo)
    setData(barInfo)
    setLoading(false)
  }

  const close = () => {
    setLoading(true)
    handleClose()
  }

  const placeEvent = async () => {
    console.log(startDate)
    const month = startDate.getMonth() + 1
    const day = startDate.getDate()
    const year = startDate.getFullYear()
    const date = [year, month, day].join(", ")
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("nightlife")}`,
    }
    const { data } = await axios.post(
      "http://localhost:3000/api/rsvp",
      { id, date },
      { headers }
    )
    close()
    mainLoading(true)
    navigate(`/?${queryString.stringify(query)}`)
  }

  useEffect(() => {
    if (show) fetchData()
  }, [show])

  return (
    <Modal show={show} onHide={close} animation={false}>
      {loading ? (
        <Modal.Body>Loading ... </Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <ModalTitle>
              {data.name}{" "}
              {data.rating &&
                Array.from(Array(Math.floor(data.rating)).keys()).map(i => (
                  <span key={i}>*</span>
                ))}
            </ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {data.photos.map((photo: string, i: number) => (
                <Carousel.Item key={i}>
                  <ImgBusiness
                    className="img-fluid"
                    src={photo}
                    alt={data.name + i}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <DescriptionContainer>
              {!data.is_closed ? (
                <DescriptionLine className="text-info">Open</DescriptionLine>
              ) : (
                <DescriptionLine className="text-danger">
                  Closed
                </DescriptionLine>
              )}
              <DescriptionLine>
                Address: : {data.address.join(" ") || "No Data"}
              </DescriptionLine>
              <DescriptionLine>Phone : {data.phone || "No Data"}</DescriptionLine>
            </DescriptionContainer>
            <DescriptionContainer>
              {new Auth().isLogged() ? (
                <>
                  {" "}
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    minDate={new Date()}
                    placeholderText="Select a date"
                  />
                  <Button variant="primary" onClick={placeEvent}>
                    I'll go there
                  </Button>
                </>
              ) : (
                <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=4e78567ab3cf78bb6571">
                  Please log in to tell the world you will be there
                </a>
              )}
            </DescriptionContainer>
            <InitialContainer>
              {data.going.map((user: any, i: number) => (
                <InitialLetter key={i}>
                  {user.name
                    .split(" ")
                    .map(word => word[0])
                    .join("")}
                </InitialLetter>
              ))}
            </InitialContainer>
            {data.reviews.map((review: any, i: number) => (
              <ReviewContainer key={i}>
                <ReviewHeader>
                  <Col md={4}>
                    <UserImgReview
                      className="img-fluid"
                      src={review.image_url}
                    />
                  </Col>
                  <Col md={8}>
                    <PMargin0>
                      {review.name}{" "}
                      {Array.from(Array(Math.floor(review.rating)).keys()).map(
                        i => (
                          <span key={i}>*</span>
                        )
                      )}
                    </PMargin0>

                    <PMargin0>{review.time_created}</PMargin0>
                  </Col>
                </ReviewHeader>

                <p>{review.text}</p>
              </ReviewContainer>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={close}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  )
}

const ModalTitle = styled(Modal.Title)`
  text-align: center;
  width: 100%;
  color: ${colors.main};
`

const DescriptionContainer = styled.div`
  margin-bottom: 1rem;
`

const DescriptionLine = styled.p`
  margin-bottom: 0 !important;
`

const ImgBusiness = styled.img`
  height: 500px;
`

const UserImgReview = styled.img`
  max-height: 70px;
`

const ReviewContainer = styled(Container)`
  border: 1px solid black;
  padding: 1rem;
  margin-bottom: 2rem;
`
const InitialContainer = styled.div`
  display: flex;
`

const InitialLetter = styled.p`
  background-color: ${colors.main};
  padding: 10px;
  border-radius: 50%;
  font-weight: 600;
  color: #fff;
`

const ReviewHeader = styled(Row)`
  align-items: center;
  margin-bottom: 1rem;
`

const PMargin0 = styled.p`
  margin-bottom: 0 !important;
`
