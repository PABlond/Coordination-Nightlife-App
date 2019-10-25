import axios from "axios"

require("dotenv").config()

const { YELP_TOKEN: yelp_token } = process.env
const headers = { Authorization: yelp_token }

export const getBusinessesQuery = async ({
  offset = 1,
  location
}: {
  offset: Number
  location: string
}) =>
  axios.get(
    `https://api.yelp.com/v3/businesses/search?term=bars&location=${location}&limit=12&offset=${offset}`,
    { headers }
  )

export const getBusinessQuery = ({ id }: { id: string }) =>
  axios.get(`https://api.yelp.com/v3/businesses/${id}`, { headers })

export const getBusinessReview = ({ id }: { id: string }) =>
  axios.get(`https://api.yelp.com/v3/businesses/${id}/reviews`, { headers })
