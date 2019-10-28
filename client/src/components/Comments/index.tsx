import React from "react"
import styled from "styled-components"
import { IReview } from "./../../interfaces/modal.interface"

import { Container, Row, Col } from "react-bootstrap"

export default ({ reviews }: { reviews: IReview[] }) => {
  return (
    <>
      {reviews.map(({ image_url, name, rating, time_created, text }: any) => (
        <ReviewContainer key={name}>
          <ReviewHeader>
            <Col md={4}>
              <UserImgReview className="img-fluid" src={image_url} />
            </Col>
            <Col md={8}>
              <PMargin0>
                {name}{" "}
                {Array.from(Array(Math.floor(rating)).keys()).map(i => (
                  <span key={i}>*</span>
                ))}
              </PMargin0>

              <PMargin0>{time_created}</PMargin0>
            </Col>
          </ReviewHeader>

          <p>{text}</p>
        </ReviewContainer>
      ))}
    </>
  )
}

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
