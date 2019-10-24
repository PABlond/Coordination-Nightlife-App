import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"

import { Modal, Button, Carousel } from "react-bootstrap"

export default ({ show, handleClose, id }) => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [data, setData] = useState({})

  const formatData = ({
    name,
    rating,
    hours: [{ is_open_now: isOpen }, _],
    image_url: photo,
  }) => {
    return { name, isOpen, photo, rating }
  }

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

  useEffect(() => {
    if (show) fetchData()
  }, [show])
  console.log(data.rating)
  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      {loading ? (
        <Modal.Body>Loading ... </Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              {data.name}{" "}
              {data.rating &&
                Array.from(Array(Math.floor(data.rating)).keys()).map(i => (
                  <span key={i}>*</span>
                ))}
            </Modal.Title>
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

            <p>{data.isOpen ? "open" : "closed"}</p>
            <p>{data.phone}</p>
            <p>{data.address.join(" ")}</p>
            {data.reviews.map((review: any, i: number) => (
              <div>
                <UserImgReview className="img-fluid" src={review.image_url} />
                <p>
                  {review.name}{" "}
                  {Array.from(Array(Math.floor(review.rating)).keys()).map(
                    i => (
                      <span key={i}>*</span>
                    )
                  )}
                </p>
                <p>{review.time_created}</p>
                <p>{review.text}</p>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  )
}

const ImgBusiness = styled.img`
  height: 500px;
`

const UserImgReview = styled.img`
  max-height: 70px;
`
