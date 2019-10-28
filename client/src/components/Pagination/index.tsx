import React from "react"
import { Pagination } from "react-bootstrap"

export default ({
  query,
  paginate,
}: {
  query: { page: string }
  paginate: (keyword: string) => void
}) => {
  return (
    <Pagination>
      {parseInt(query.page) > 1 && (
        <Pagination.Prev onClick={() => paginate("previous")} />
      )}

      <Pagination.Next onClick={() => paginate("next")} />
    </Pagination>
  )
}
