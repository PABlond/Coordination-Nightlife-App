import React from "react"
import styled from "styled-components"
import { IBar } from "./../../interfaces/bars.interface"

import { Col } from "react-bootstrap"
import Initial from "./../Initial"
import Img, { GatsbyImageProps } from "gatsby-image"

export default ({
  bars,
  openModalBar,
  placeholderFluid,
}: {
  bars: IBar[]
  openModalBar: (id: string) => void
  placeholderFluid: GatsbyImageProps
}) => {
  return (
    <>
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
                <Img {...placeholderFluid} />
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
                <InitialContainer>
                  {going.length > 0 ? (
                    <>
                      {going.map((user: any, i: number) => (
                        <Initial user={user} key={i} />
                      ))}
                    </>
                  ) : (
                    "Nobody is interested"
                  )}
                </InitialContainer>
              </DescriptionContainer>
            </Col>
          )
        }
      )}
    </>
  )
}

const DescriptionContainer = styled.div`
  margin-bottom: 1rem;
`

const DescriptionLine = styled.p`
  margin-bottom: 0 !important;
`

const CardTitle = styled.h3`
  text-align: center;
`

const InitialContainer = styled.div`
  display: flex;
`
