import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"

import { Container, Row, Col, Modal, Button, Carousel } from "react-bootstrap"

export default ({ show, handleClose, id }) => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [data, setData] = useState({})

  const fetchData = async () => {
    const { data: barInfo } = await axios.post(
      "http://localhost:3000/api/business",
      {
        id,
      }
    )
    setData(barInfo)
    setLoading(false)
  }

  const close = () => {
    setLoading(true)
    handleClose()
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

            {data.isOpen ? (
              <p className="text-info">"Open"</p>
            ) : (
              <p className="text-danger">Closed</p>
            )}
            <p>{data.phone}</p>
            <p>{data.address.join(" ")}</p>
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

const ReviewHeader = styled(Row)`
  align-items: center;
  margin-bottom: 1rem;
`

const PMargin0 = styled.p`
  margin-bottom: 0 !important;
`
