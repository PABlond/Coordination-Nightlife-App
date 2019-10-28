import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import queryString from "query-string"
import colors from "./../../config/colors"
import { IModalData } from "./../../interfaces/modal.interface"
import { getBusiness, placeEvent } from "./../../actions/queries"
import Auth from "./../../actions/auth"

import { Modal, Carousel, Button } from "react-bootstrap"
import DatePicker from "react-datepicker"
import Initial from "./../Initial"
import Comments from "./../Comments"

export default ({
  show,
  handleClose,
  id,
  query,
  mainLoading,
}: {
  show: boolean | undefined
  handleClose: () => void
  id: string
  query: any
  mainLoading: (bool: Boolean) => void
}) => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [data, setData] = useState<IModalData | {}>({})
  const [startDate, setStartDate] = useState<Date | null>(null)

  const fetchData = async () => {
    const barInfo = await getBusiness(id)
    setData(barInfo)
    setLoading(false)
  }

  const close = () => {
    setLoading(true)
    handleClose()
  }

  const handlePlaceEvent = async () => {
    if (startDate) {
      const month = startDate.getMonth() + 1
      const day = startDate.getDate()
      const year = startDate.getFullYear()
      const date = [year, month, day].join(", ")
      await placeEvent(id, date)
      close()
      mainLoading(true)
      navigate(`/?${queryString.stringify(query)}`)
    }
  }

  useEffect(() => {
    if (show) fetchData()
  }, [show])

  const {
    rating = 0,
    name = "",
    photos = [],
    going = [],
    is_closed = false,
    address = [""],
    phone = "",
    reviews = [],
  } = data as IModalData

  return (
    <Modal show={show} onHide={close} animation={false}>
      {loading && Object.keys(data).length ? (
        <Modal.Body>Loading ... </Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <ModalTitle>
              {name}{" "}
              {rating &&
                Array.from(Array(Math.floor(rating)).keys()).map(i => (
                  <span key={i}>*</span>
                ))}
            </ModalTitle>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {photos.map((photo: string, i: number) => (
                <Carousel.Item key={i}>
                  <ImgBusiness
                    className="img-fluid"
                    src={photo}
                    alt={name + i}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <DescriptionContainer>
              {!is_closed ? (
                <DescriptionLine className="text-info">Open</DescriptionLine>
              ) : (
                <DescriptionLine className="text-danger">
                  Closed
                </DescriptionLine>
              )}
              <DescriptionLine>
                Address: : {address.join(" ") || "No Data"}
              </DescriptionLine>
              <DescriptionLine>Phone : {phone || "No Data"}</DescriptionLine>
            </DescriptionContainer>
            <DescriptionContainer>
              {new Auth().isLogged() ? (
                <>
                  {" "}
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    minDate={new Date()}
                    placeholderText="Select a date"
                  />
                  <Button variant="primary" onClick={handlePlaceEvent}>
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
              {going.map((user: any, i: number) => (
                <Initial user={user} key={i} />
              ))}
            </InitialContainer>
            <Comments reviews={reviews} />
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

const InitialContainer = styled.div`
  display: flex;
`
