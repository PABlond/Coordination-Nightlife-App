import { searchBusinesses as queryBusinesses } from "./../config/yelpQueries"
import client from "./../config/apolloClient"
import axios from "axios"
import { IBuisness, ReqReview } from "./../interfaces/query.interface"

require("dotenv").config()

export default class Businesses {
  yelp_token = process.env.YELP_TOKEN

  getBusinesses = async (location: string) => {
    const {
      data: {
        search: { business: buisnesses }
      }
    } = await client.query({
      query: queryBusinesses,
      variables: {
        location
      }
    })
    return buisnesses
  }

  getBusiness = async ({ id }: any) => {
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/${id}`,
      {
        headers: { Authorization: this.yelp_token }
      }
    )
    const {
      data: { reviews }
    } = await axios.get(`https://api.yelp.com/v3/businesses/${id}/reviews`, {
      headers: { Authorization: this.yelp_token }
    })
    return this.formatData({
      ...data,
      reviews: reviews.map(
        ({
          rating,
          text,
          time_created,
          user: { image_url, name }
        }: ReqReview) => ({
          rating,
          text,
          time_created,
          image_url,
          name
        })
      )
    })
  }

  formatData = ({
    name,
    rating,
    phone,
    photos,
    location: { display_address: address },
    coordinate,
    reviews
  }: IBuisness) => ({
    name,
    photos,
    rating,
    phone,
    address,
    coordinate,
    reviews
  })
}
